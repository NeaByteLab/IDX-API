import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync daily trading info.
 * @description Updates daily trading snapshot for a company.
 * @param code - Company ticker code
 * @returns Empty promise completion
 */
export async function syncTradingDaily(code: string): Promise<void> {
  Logger.info(`[Sync] Starting syncTradingDaily for ${code}...`)
  const trading = new TradingModule()
  const item = await trading.getTradingInfoDaily(code)
  if (item) {
    const values = {
      id: item.id,
      code: item.code,
      board: item.board,
      previous: item.price.previous,
      open: item.price.open,
      high: item.price.high,
      low: item.price.low,
      close: item.price.close,
      change: item.price.change,
      volume: item.trading.volume,
      value: item.trading.value,
      frequency: item.trading.frequency,
      bid: item.orderBook.bid,
      bidVolume: item.orderBook.bidVolume,
      offer: item.orderBook.offer,
      offerVolume: item.orderBook.offerVolume,
      individualIndex: item.market.individualIndex,
      foreignShares: item.market.foreignShares,
      updatedAt: item.updatedAt
    }
    await Database.insert(schemas.tradingDaily).values(values).onConflictDoUpdate({
      target: schemas.tradingDaily.id,
      set: values
    })
    Logger.info(`[Sync] Completed syncTradingDaily for ${code}.`)
  } else {
    Logger.warn(`[Sync] No data found for syncTradingDaily for ${code}.`)
  }
}
