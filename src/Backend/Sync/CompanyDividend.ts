import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync company dividends.
 * @description Updates dividend announcement schedules.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncCompanyDividend(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncCompanyDividend for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getDividendAnnouncements(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      id: `${item.code}-${new Date(item.recordDate).getTime()}`,
      code: item.code,
      name: item.name,
      cashDividend: item.cashDividend,
      cumDividend: item.cumDividend ? new Date(item.cumDividend).getTime() : null,
      exDividend: item.exDividend ? new Date(item.exDividend).getTime() : null,
      recordDate: new Date(item.recordDate).getTime(),
      paymentDate: item.paymentDate ? new Date(item.paymentDate).getTime() : null,
      period
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
          Database.insert(schemas.companyDividend).values(values).onConflictDoUpdate({
            target: schemas.companyDividend.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncCompanyDividend. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncCompanyDividend for ${year}-${month}.`)
  }
}
