import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync daily index performance.
 * @description Updates index closing prices and time-series.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncDailyIndex(year: number, month: number): Promise<void> {
  const market = new MarketModule()
  const result = await market.getDailyIndices(year, month)
  if (result && result.length > 0) {
    const queries = result.flatMap((index) =>
      index.points.map((point) => {
        const id = `${index.name}-${new Date(point.date).getTime()}`
        const values = {
          id,
          name: index.name,
          close: point.close,
          date: new Date(point.date)
        }
        return db
          .insert(schemas.dailyIndex)
          .values(values)
          .onConflictDoUpdate({
            target: schemas.dailyIndex.id,
            set: { close: point.close }
          })
      })
    )
    await Promise.all(queries)
  }
}
