import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync financial reports.
 * @description Updates financial report metadata for a company.
 * @param code - Company ticker code
 * @param year - Target year
 * @param period - Fiscal period
 * @returns Empty promise completion
 */
export async function syncFinancialReport(
  code: string,
  year: number,
  period: 'TW1' | 'TW2' | 'TW3' | 'audit' = 'audit'
): Promise<void> {
  Logger.info(`[Sync] Starting syncFinancialReport for ${code} ${year} ${period}...`)
  const company = new CompanyModule()
  const result = await company.getFinancialReports(code, year, period)
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: `${item.code}-${item.year}-${item.period}`,
      code: item.code,
      name: item.name,
      year: item.year,
      period: item.period,
      attachments: JSON.stringify(item.attachments)
    }))
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.financialReport).values(values).onConflictDoUpdate({
            target: schemas.financialReport.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncFinancialReport for ${code}.`)
  } else {
    Logger.warn(`[Sync] No data found for syncFinancialReport for ${code}.`)
  }
}
