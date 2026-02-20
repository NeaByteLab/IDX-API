import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync stock screener.
 * @description Updates stock screener analytics for all stocks.
 * @returns Empty promise completion
 */
export async function syncStockScreener(): Promise<void> {
  Logger.info(`[Sync] Starting syncStockScreener...`)
  const company = new CompanyModule()
  const result = await company.getStockScreener()
  if (result && result.results.length > 0) {
    const allValues = result.results.map((item) => ({
      code: item.code,
      name: item.name,
      subIndustryCode: item.subIndustryCode,
      sector: item.sector,
      subSector: item.subSector,
      industry: item.industry,
      subIndustry: item.subIndustry,
      marketCapital: item.marketCapital,
      totalRevenue: item.totalRevenue,
      npm: item.npm,
      per: item.per,
      pbv: item.pbv,
      roa: item.roa,
      roe: item.roe,
      der: item.der,
      week4: item.week4,
      week13: item.week13,
      week26: item.week26,
      week52: item.week52,
      ytd: item.ytd,
      mtd: item.mtd,
      umaDate: item.umaDate,
      notation: item.notation,
      status: item.status,
      corpAction: item.corpAction,
      corpActionDate: item.corpActionDate
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
          Database.insert(schemas.stockScreener).values(values).onConflictDoUpdate({
            target: schemas.stockScreener.code,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncStockScreener. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncStockScreener.`)
  }
}
