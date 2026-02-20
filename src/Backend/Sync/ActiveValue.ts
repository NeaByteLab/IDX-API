import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync highest value stocks.
 * @description Updates stocks with highest trading value.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncActiveValue(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncActiveValue for ${year}-${month}...`)
  const module = new TradingModule()
  const result = await module.getMostActiveByValue(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const timestamp = new Date(period).getTime()
    const queries = result.data.map((item) => {
      const id = `${item.code}-${timestamp}`
      const values = {
        id,
        code: item.code,
        name: item.name,
        volume: item.volume,
        value: item.value,
        frequency: item.frequency,
        volumePercent: item.volumePercent,
        valuePercent: item.valuePercent,
        frequencyPercent: item.freqPercent,
        tradingDays: item.tradingDays,
        period
      }
      return Database.insert(schemas.activeValue).values(values).onConflictDoUpdate({
        target: schemas.activeValue.id,
        set: values
      })
    })
    await Promise.all(queries)
    Logger.info(`[Sync] Completed syncActiveValue. Synced ${queries.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncActiveValue for ${year}-${month}.`)
  }
}
