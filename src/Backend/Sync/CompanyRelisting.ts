import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync company relistings.
 * @description Updates companies returning to exchange.
 * @returns Empty promise completion
 */
export async function syncCompanyRelisting(): Promise<void> {
  Logger.info('[Sync] Starting syncCompanyRelisting...')
  const module = new CompanyModule()
  const result = await module.getRelistingData()
  if (result && result.data.length > 0) {
    const allValues = result.data.map((item) => ({
      code: item.code,
      name: item.name,
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
          Database.insert(schemas.companyRelisting).values(values).onConflictDoUpdate({
            target: schemas.companyRelisting.code,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncCompanyRelisting. Synced ${allValues.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncCompanyRelisting.')
  }
}
