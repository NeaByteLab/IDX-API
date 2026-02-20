import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync market calendar.
 * @description Updates market events for specified date.
 * @param date - Target date in YYYYMMDD format
 * @returns Empty promise completion
 */
export async function syncMarketCalendar(date: string): Promise<void> {
  Logger.info('[Sync] Starting syncMarketCalendar...')
  const market = new MarketModule()
  const result = await market.getCalendar(date)
  if (result && result.results.length > 0) {
    const allValues = result.results.map((item) => ({
      id: item.id,
      code: item.code,
      type: item.type,
      description: item.description,
      location: item.location,
      step: item.step,
      date: new Date(item.date).getTime(),
      year: item.year
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
          Database.insert(schemas.marketCalendar).values(values).onConflictDoUpdate({
            target: schemas.marketCalendar.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncMarketCalendar. Synced ${allValues.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncMarketCalendar.')
  }
}
