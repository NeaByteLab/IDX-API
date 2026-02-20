import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync stock splits.
 * @description Updates stock split and reverse-split events.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncStockSplit(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncStockSplit for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getStockSplits(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      period,
      id: `${item.code}-${new Date(item.listingDate).getTime()}`,
      code: item.code,
      name: item.name,
      type: item.type,
      ratio: item.ratio,
      oldNominal: item.oldNominal,
      newNominal: item.newNominal,
      additionalShares: item.additionalShares,
      listedShares: item.listedShares,
      listingDate: new Date(item.listingDate).getTime()
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
          Database.insert(schemas.stockSplit).values(values).onConflictDoUpdate({
            target: schemas.stockSplit.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncStockSplit. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncStockSplit for ${year}-${month}.`)
  }
}
