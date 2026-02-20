import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync trading stock summary.
 * @description Updates historical daily summaries for a company.
 * @param code - Company ticker code
 * @param start - Pagination start index
 * @param length - Maximum record count
 * @returns Empty promise completion
 */
export async function syncTradingSS(code: string, start = 0, length = 1000): Promise<void> {
  Logger.info(`[Sync] Starting syncTradingSS for ${code}...`)
  const trading = new TradingModule()
  const result = await trading.getTradingInfoSS(code, start, length)
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: item.id,
      no: item.no,
      code: item.code,
      name: item.name,
      date: item.date,
      previous: item.price.previous,
      open: item.price.open,
      high: item.price.high,
      low: item.price.low,
      close: item.price.close,
      change: item.price.change,
      volume: item.trading.volume,
      value: item.trading.value,
      frequency: item.trading.frequency,
      firstTrade: item.trading.firstTrade,
      bid: item.orderBook.bid,
      bidVolume: item.orderBook.bidVolume,
      offer: item.orderBook.offer,
      offerVolume: item.orderBook.offerVolume,
      listedShares: item.shares.listed,
      tradableShares: item.shares.tradable,
      weightForIndex: item.shares.weightForIndex,
      individualIndex: item.shares.individualIndex
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
          Database.insert(schemas.tradingSS).values(values).onConflictDoUpdate({
            target: schemas.tradingSS.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncTradingSS for ${code}. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncTradingSS for ${code}.`)
  }
}
