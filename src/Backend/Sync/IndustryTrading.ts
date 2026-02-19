import * as schemas from '@app/Backend/Schemas/index.ts'
import TradingModule from '@app/Trading/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync industry trading summary.
 * @description Updates activity metrics aggregated by industry.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncIndustryTrading(year: number, month: number): Promise<void> {
  const module = new TradingModule()
  const result = await module.getIndustryTradingSummary(year, month)
  if (result && result.length > 0) {
    const queries = result.map((item) => {
      const id = `${item.industry}-${new Date(item.date).getTime()}`
      const values = {
        id,
        date: new Date(item.date),
        industry: item.industry,
        members: item.members,
        shares: item.shares,
        marketCap: item.marketCap,
        volume: item.volume,
        value: item.value,
        frequency: item.frequency,
        per: item.per,
        pbv: item.pbv
      }
      return db.insert(schemas.industryTrading).values(values).onConflictDoUpdate({
        target: schemas.industryTrading.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
