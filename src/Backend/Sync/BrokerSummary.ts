import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync broker summary.
 * @description Processes daily brokerage totals for specific date.
 * @param date - YYYYMMDD date string
 * @returns Empty promise completion
 */
export async function syncBrokerSummary(date: string): Promise<void> {
  Logger.info(`[Sync] Starting syncBrokerSummary for ${date}...`)
  const trading = new TradingModule()
  const result = await trading.getBrokerSummary(date)
  if (result && result.data.length > 0) {
    const allValues = result.data.map((item) => ({
      id: item.id,
      date: new Date(item.date).getTime(),
      brokerCode: item.brokerCode,
      brokerName: item.brokerName,
      totalValue: item.totalValue,
      volume: item.volume,
      frequency: item.frequency
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
          Database.insert(schemas.brokerSummary).values(values).onConflictDoUpdate({
            target: schemas.brokerSummary.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncBrokerSummary. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncBrokerSummary for ${date}.`)
  }
}
