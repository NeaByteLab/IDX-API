import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync top gainer stocks.
 * @description Updates daily top 20 stock gainers.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncTopGainer(year: number, month: number): Promise<void> {
  const module = new TradingModule()
  const result = await module.getTopGainers(year, month)
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
      return db.insert(schemas.topGainer).values(values).onConflictDoUpdate({
        target: schemas.topGainer.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
