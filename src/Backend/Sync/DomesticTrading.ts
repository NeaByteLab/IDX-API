import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync domestic investor trading.
 * @description Updates daily activity metrics for investors.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncDomesticTrading(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncDomesticTrading for ${year}-${month}...`)
  const module = new TradingModule()
  const result = await module.getDomesticTradingSummary(year, month)
  if (result && result.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.map((item) => ({
      date: new Date(item.date).getTime(),
      buyVolume: item.buyVolume,
      buyValue: item.buyValue,
      buyFrequency: item.buyFrequency,
      sellVolume: item.sellVolume,
      sellValue: item.sellValue,
      sellFrequency: item.sellFrequency,
      period
    }))
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.domesticTrading)
            .values(values)
            .onConflictDoUpdate({
              target: schemas.domesticTrading.date,
              set: {
                buyVolume: values.buyVolume,
                buyValue: values.buyValue,
                buyFrequency: values.buyFrequency,
                sellVolume: values.sellVolume,
                sellValue: values.sellValue,
                sellFrequency: values.sellFrequency,
                period: values.period
              }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncDomesticTrading. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncDomesticTrading for ${year}-${month}.`)
  }
}
