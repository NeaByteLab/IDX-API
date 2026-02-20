import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync trade summary.
 * @description Updates daily trade summary by type.
 * @returns Empty promise completion
 */
export async function syncTradeSummary(): Promise<void> {
  Logger.info('[Sync] Starting syncTradeSummary...')
  const trading = new TradingModule()
  const result = await trading.getTradeSummary()
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: item.id,
      volume: item.volume,
      value: item.value,
      frequency: item.frequency,
      date: new Date(item.date).getTime()
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
          Database.insert(schemas.tradeSummary)
            .values(values)
            .onConflictDoUpdate({
              target: [schemas.tradeSummary.id, schemas.tradeSummary.date],
              set: {
                volume: values.volume,
                value: values.value,
                frequency: values.frequency
              }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncTradeSummary. Synced ${allValues.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncTradeSummary.')
  }
}
