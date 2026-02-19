import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync top loser stocks.
 * @description Updates daily top 20 stock losers.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncTopLoser(year: number, month: number): Promise<void> {
  const module = new TradingModule()
  const result = await module.getTopLosers(year, month)
  if (result && result.length > 0) {
    const today = new Date().toISOString()
    const timestamp = new Date(today).getTime()
    const queries = result.map((item) => {
      const id = `${item.code}-${timestamp}`
      const values = {
        id,
        code: item.code,
        name: item.name,
        previous: item.previous,
        previousCa: item.previousCA,
        close: item.close,
        dilution: item.dilution,
        change: item.change,
        percentage: item.percentage
      }
      return db.insert(schemas.topLoser).values(values).onConflictDoUpdate({
        target: schemas.topLoser.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
