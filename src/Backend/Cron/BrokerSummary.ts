import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync Broker Summary.
 * @description Process daily brokerage totals for a specific date.
 * @param date - YYYYMMDD format date string
 * @returns Empty promise completion
 */
export async function syncBrokerSummary(date: string): Promise<void> {
  const trading = new TradingModule()
  const result = await trading.getBrokerSummary(date)
  if (result && result.data.length > 0) {
    const batch = result.data.map((item) =>
      db
        .insert(schemas.brokerSummary)
        .values({
          id: item.id,
          date: item.date,
          brokerCode: item.brokerCode,
          brokerName: item.brokerName,
          totalValue: item.totalValue,
          volume: item.volume,
          frequency: item.frequency
        })
        .onConflictDoUpdate({
          target: schemas.brokerSummary.id,
          set: {
            brokerName: item.brokerName,
            totalValue: item.totalValue,
            volume: item.volume,
            frequency: item.frequency
          }
        })
    )
    await Promise.all(batch)
  }
}
