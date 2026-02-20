import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync company delistings.
 * @description Updates stocks removed from exchange for period.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncCompanyDelisting(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncCompanyDelisting for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getDelistings(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      id: `${item.code}-${new Date(item.delistingDate).getTime()}`,
      code: item.code,
      name: item.name,
      listedShares: item.listedShares,
      marketCap: item.marketCap,
      regularPrice: item.regularPrice,
      lastDate: new Date(item.lastDate).getTime(),
      listingDate: item.listingDate ? new Date(item.listingDate).getTime() : null,
      delistingDate: new Date(item.delistingDate).getTime(),
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
          Database.insert(schemas.companyDelisting).values(values).onConflictDoUpdate({
            target: schemas.companyDelisting.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncCompanyDelisting. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncCompanyDelisting for ${year}-${month}.`)
  }
}
