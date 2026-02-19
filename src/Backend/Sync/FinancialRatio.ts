import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync financial ratios.
 * @description Updates key financial indicators for companies.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncFinancialRatio(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getFinancialRatios(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.financialRatio)
        .values({
          code: item.code,
          name: item.name,
          sector: item.sector,
          subSector: item.subSector,
          industry: item.industry,
          subIndustry: item.subIndustry,
          period: new Date(item.period),
          assets: item.assets,
          liabilities: item.liabilities,
          equity: item.equity,
          sales: item.sales,
          ebt: item.ebt,
          profit: item.profit,
          eps: item.eps,
          bookValue: item.bookValue,
          per: item.per,
          pbv: item.pbv,
          der: item.der,
          roa: item.roa,
          roe: item.roe,
          npm: item.npm
        })
        .onConflictDoUpdate({
          target: schemas.financialRatio.id,
          set: {
            assets: item.assets,
            liabilities: item.liabilities,
            equity: item.equity,
            sales: item.sales,
            profit: item.profit,
            eps: item.eps,
            per: item.per,
            pbv: item.pbv
          }
        })
    )
    await Promise.all(queries)
  }
}
