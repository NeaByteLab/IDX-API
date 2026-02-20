import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync financial ratios.
 * @description Updates key financial indicators for companies.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncFinancialRatio(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncFinancialRatio for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getFinancialRatios(year, month)
  if (result && result.data.length > 0) {
    const allValues = result.data.map((item) => {
      const periodMillis = new Date(item.period).getTime()
      return {
        id: `${item.code}-${periodMillis}`,
        code: item.code,
        name: item.name,
        sector: item.sector,
        subSector: item.subSector,
        industry: item.industry,
        subIndustry: item.subIndustry,
        period: periodMillis,
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
      }
    })
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.financialRatio).values(values).onConflictDoUpdate({
            target: schemas.financialRatio.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncFinancialRatio. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncFinancialRatio for ${year}-${month}.`)
  }
}
