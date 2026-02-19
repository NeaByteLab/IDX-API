import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync highest volume stocks.
 * @description Updates stocks with highest trading volume.
 * @param year - Target year
 * @param month - Target month
 * @param date - Record date
 * @returns Empty promise completion
 */
export async function syncActiveVolume(year: number, month: number, date: string): Promise<void> {
  const module = new TradingModule()
  const result = await module.getMostActiveByVolume(year, month)
  if (result && result.data.length > 0) {
    const timestamp = new Date(date).getTime()
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
        tradingDays: item.tradingDays
      }
      return db.insert(schemas.activeVolume).values(values).onConflictDoUpdate({
        target: schemas.activeVolume.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
