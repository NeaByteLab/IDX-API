import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync Trade Summary.
 * @description Process daily trade summary by type/segment.
 * @returns Empty promise completion
 */
export async function syncTradeSummary(): Promise<void> {
  const trading = new TradingModule()
  const result = await trading.getTradeSummary()
  if (result && result.length > 0) {
    const batch = result.map((item) =>
      db
        .insert(schemas.tradeSummary)
        .values({
          id: item.id,
          volume: item.volume,
          value: item.value,
          frequency: item.frequency,
          date: new Date(item.date)
        })
        .onConflictDoUpdate({
          target: [schemas.tradeSummary.id, schemas.tradeSummary.date],
          set: {
            volume: item.volume,
            value: item.value,
            frequency: item.frequency
          }
        })
    )
    await Promise.all(batch)
  }
}
