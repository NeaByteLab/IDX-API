import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync industry trading summary.
 * @description Updates activity metrics aggregated by industry.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncIndustryTrading(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncIndustryTrading for ${year}-${month}...`)
  const module = new TradingModule()
  const result = await module.getIndustryTradingSummary(year, month)
  if (result && result.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.map((item) => ({
      period,
      id: `${item.industry}-${new Date(item.date).getTime()}`,
      date: new Date(item.date).getTime(),
      industry: item.industry,
      members: item.members,
      shares: item.shares,
      marketCap: item.marketCap,
      volume: item.volume,
      value: item.value,
      frequency: item.frequency,
      per: item.per,
      pbv: item.pbv
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
          Database.insert(schemas.industryTrading).values(values).onConflictDoUpdate({
            target: schemas.industryTrading.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncIndustryTrading. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncIndustryTrading for ${year}-${month}.`)
  }
}
