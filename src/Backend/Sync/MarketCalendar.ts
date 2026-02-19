import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync market calendar.
 * @description Updates market events for current date.
 * @returns Empty promise completion
 */
export async function syncMarketCalendar(): Promise<void> {
  const market = new MarketModule()
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const result = await market.getCalendar(today)
  if (result && result.results.length > 0) {
    const queries = result.results.map((item) => {
      const values = {
        id: item.id,
        code: item.code,
        type: item.type,
        description: item.description,
        location: item.location,
        step: item.step,
        date: new Date(item.date),
        year: item.year
      }
      return db.insert(schemas.marketCalendar).values(values).onConflictDoUpdate({
        target: schemas.marketCalendar.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
