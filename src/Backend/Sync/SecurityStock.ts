import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync security stocks.
 * @description Updates master list of listed securities.
 * @returns Empty promise completion
 */
export async function syncSecurityStock(): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getSecuritiesStock()
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.securityStock)
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
  }
}
