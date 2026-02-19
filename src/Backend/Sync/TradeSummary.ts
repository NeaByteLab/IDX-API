import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync trade summary.
 * @description Updates daily trade summary by type.
 * @returns Empty promise completion
 */
export async function syncTradeSummary(): Promise<void> {
  const trading = new TradingModule()
  const result = await trading.getTradeSummary()
  if (result && result.length > 0) {
    const queries = result.map((item) =>
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
    await Promise.all(queries)
  }
}
