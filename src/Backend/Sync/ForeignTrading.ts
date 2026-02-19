import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync foreign investor trading.
 * @description Updates daily activity metrics for investors.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncForeignTrading(year: number, month: number): Promise<void> {
  const module = new TradingModule()
  const result = await module.getForeignTradingSummary(year, month)
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      db
        .insert(schemas.foreignTrading)
        .values({
          date: new Date(item.date),
          buyVolume: item.buyVolume,
          buyValue: item.buyValue,
          buyFrequency: item.buyFrequency,
          sellVolume: item.sellVolume,
          sellValue: item.sellValue,
          sellFrequency: item.sellFrequency
        })
        .onConflictDoUpdate({
          target: schemas.foreignTrading.date,
          set: {
            buyVolume: item.buyVolume,
            buyValue: item.buyValue,
            buyFrequency: item.buyFrequency,
            sellVolume: item.sellVolume,
            sellValue: item.sellValue,
            sellFrequency: item.sellFrequency
          }
        })
    )
    await Promise.all(queries)
  }
}
