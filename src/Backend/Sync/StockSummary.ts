import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync stock summary.
 * @description Updates daily stock summaries for date.
 * @param date - YYYYMMDD date string
 * @returns Empty promise completion
 */
export async function syncStockSummary(date: string): Promise<void> {
  Logger.info(`[Sync] Starting syncStockSummary for ${date}...`)
  const trading = new TradingModule()
  const result = await trading.getStockSummary(date)
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      date: new Date(item.date).getTime(),
      remarks: item.remarks,
      open: item.price.open,
      high: item.price.high,
      low: item.price.low,
      close: item.price.close,
      previous: item.price.previous,
      change: item.price.change,
      volume: item.trading.volume,
      value: item.trading.value,
      frequency: item.trading.frequency,
      firstTrade: item.trading.firstTrade,
      bid: item.orderBook.bid,
      bidVolume: item.orderBook.bidVolume,
      offer: item.orderBook.offer,
      offerVolume: item.orderBook.offerVolume,
      foreignBuy: item.foreign.buy,
      foreignSell: item.foreign.sell,
      foreignNet: item.foreign.net,
      listedShares: item.shares.listed,
      tradableShares: item.shares.tradable,
      weightForIndex: item.shares.weightForIndex,
      individualIndex: item.shares.individualIndex,
      nonRegularVolume: item.nonRegular.volume,
      nonRegularValue: item.nonRegular.value,
      nonRegularFrequency: item.nonRegular.frequency
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
          Database.insert(schemas.stockSummary).values(values).onConflictDoUpdate({
            target: schemas.stockSummary.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncStockSummary. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncStockSummary for ${date}.`)
  }
}
