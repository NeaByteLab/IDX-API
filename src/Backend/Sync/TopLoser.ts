import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync top loser stocks.
 * @description Updates daily top 20 stock losers.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncTopLoser(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncTopLoser for ${year}-${month}...`)
  const module = new TradingModule()
  const result = await module.getTopLosers(year, month)
  if (result && result.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const timestamp = new Date(period).getTime()
    const allValues = result.map((item) => ({
      id: `${item.code}-${timestamp}`,
      code: item.code,
      name: item.name,
      previous: item.previous,
      previousCa: item.previousCA,
      close: item.close,
      dilution: item.dilution,
      change: item.change,
      percentage: item.percentage,
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
          Database.insert(schemas.topLoser).values(values).onConflictDoUpdate({
            target: schemas.topLoser.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncTopLoser. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncTopLoser for ${year}-${month}.`)
  }
}
