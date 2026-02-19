import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync Index Summary.
 * @description Process market indices for a specific date.
 * @param date - YYYYMMDD format date string
 * @returns Empty promise completion
 */
export async function syncIndexSummary(date: string): Promise<void> {
  const trading = new TradingModule()
  const result = await trading.getIndexSummary(date)
  if (result && result.data && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.indexSummary)
        .values({
          id: item.id,
          code: item.code,
          name: item.name,
          date: item.date,
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
        })
        .onConflictDoUpdate({
          target: schemas.indexSummary.id,
          set: {
            name: item.name,
            date: item.date,
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
          }
        })
    )
    await Promise.all(queries)
  }
}
