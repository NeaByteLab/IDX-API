import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync additional listings.
 * @description Updates newly added shares for specific period.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncAdditionalListing(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncAdditionalListing for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getAdditionalListings(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      id: `${item.code}-${new Date(item.startDate).getTime()}`,
      code: item.code,
      name: item.name,
      shares: item.shares,
      type: item.type,
      startDate: new Date(item.startDate).getTime(),
      lastDate: new Date(item.lastDate).getTime(),
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
          Database.insert(schemas.additionalListing).values(values).onConflictDoUpdate({
            target: schemas.additionalListing.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncAdditionalListing. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncAdditionalListing for ${year}-${month}.`)
  }
}
