import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync security stocks.
 * @description Updates master list of listed securities.
 * @returns Empty promise completion
 */
export async function syncSecurityStock(): Promise<void> {
  Logger.info('[Sync] Starting syncSecurityStock...')
  const module = new CompanyModule()
  const result = await module.getSecuritiesStock()
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      Database.insert(schemas.securityStock)
        .values({
          code: item.code,
          name: item.name,
          shares: item.shares,
          listingBoard: item.listingBoard,
          listingDate: item.listingDate ? new Date(item.listingDate) : null
        })
        .onConflictDoUpdate({
          target: schemas.securityStock.code,
          set: {
            name: item.name,
            shares: item.shares,
            listingBoard: item.listingBoard,
            listingDate: item.listingDate ? new Date(item.listingDate) : null
          }
        })
    )
    await Promise.all(queries)
    Logger.info(`[Sync] Completed syncSecurityStock. Synced ${queries.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncSecurityStock.')
  }
}
