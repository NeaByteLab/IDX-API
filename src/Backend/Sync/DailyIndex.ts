import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync daily index performance.
 * @description Updates index closing prices and time-series.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncDailyIndex(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncDailyIndex for ${year}-${month}...`)
  const market = new MarketModule()
  const result = await market.getDailyIndices(year, month)
  if (result && result.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.flatMap((index) =>
      index.points.map((point) => ({
        id: `${index.name}-${new Date(point.date).getTime()}`,
        name: index.name,
        close: point.close,
        date: new Date(point.date).getTime(),
        period
      }))
    )
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.dailyIndex)
            .values(values)
            .onConflictDoUpdate({
              target: schemas.dailyIndex.id,
              set: { close: values.close, period: values.period }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncDailyIndex. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncDailyIndex for ${year}-${month}.`)
  }
}
