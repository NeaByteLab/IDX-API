import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync domestic investor trading.
 * @description Updates daily activity metrics for investors.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncDomesticTrading(year: number, month: number): Promise<void> {
  const module = new TradingModule()
  const result = await module.getDomesticTradingSummary(year, month)
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      db
        .insert(schemas.domesticTrading)
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
          target: schemas.domesticTrading.date,
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
