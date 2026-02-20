import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync index summary.
 * @description Updates market indices for specific date.
 * @param date - YYYYMMDD date string
 * @returns Empty promise completion
 */
export async function syncIndexSummary(date: string): Promise<void> {
  Logger.info(`[Sync] Starting syncIndexSummary for ${date}...`)
  const trading = new TradingModule()
  const result = await trading.getIndexSummary(date)
  if (result && result.data && result.data.length > 0) {
    const allValues = result.data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      date: new Date(item.date).getTime(),
      previous: item.price.previous,
      high: item.price.high,
      low: item.price.low,
      close: item.price.close,
      change: item.price.change,
      percent: item.price.percent,
      volume: item.trading.volume,
      value: item.trading.value,
      frequency: item.trading.frequency,
      marketCap: item.marketCap
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
          Database.insert(schemas.indexSummary).values(values).onConflictDoUpdate({
            target: schemas.indexSummary.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncIndexSummary. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncIndexSummary for ${date}.`)
  }
}
