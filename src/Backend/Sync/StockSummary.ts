import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync stock summary.
 * @description Updates daily stock summaries for date.
 * @param date - YYYYMMDD date string
 * @returns Empty promise completion
 */
export async function syncStockSummary(date: string): Promise<void> {
  const trading = new TradingModule()
  const result = await trading.getStockSummary(date)
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      db
        .insert(schemas.stockSummary)
        .values({
          id: item.id,
          code: item.code,
          name: item.name,
          date: item.date,
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
        })
        .onConflictDoUpdate({
          target: schemas.stockSummary.id,
          set: {
            name: item.name,
            remarks: item.remarks,
            open: item.price.open,
            high: item.price.high,
            low: item.price.low,
            close: item.price.close,
            change: item.price.change,
            volume: item.trading.volume,
            value: item.trading.value,
            frequency: item.trading.frequency,
            foreignNet: item.foreign.net
          }
        })
    )
    await Promise.all(queries)
  }
}
