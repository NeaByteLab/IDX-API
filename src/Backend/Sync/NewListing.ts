import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync new listings IPO.
 * @description Updates newly listed companies on exchange.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncNewListing(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncNewListing for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getNewListings(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      code: item.code,
      name: item.name,
      listedShares: item.listedShares,
      offeringShares: item.offeringShares,
      offeringPrice: item.offeringPrice,
      fundRaised: item.fundRaised,
      listingDate: new Date(item.listingDate).getTime(),
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
          Database.insert(schemas.newListing).values(values).onConflictDoUpdate({
            target: schemas.newListing.code,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncNewListing. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncNewListing for ${year}-${month}.`)
  }
}
