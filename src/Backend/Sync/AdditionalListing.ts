import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync additional listings.
 * @description Updates newly added shares for specific period.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncAdditionalListing(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getAdditionalListings(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.additionalListing)
        .values({
          code: item.code,
          name: item.name,
          shares: item.shares,
          type: item.type,
          listingDate: new Date(item.listingDate)
        })
        .onConflictDoUpdate({
          target: schemas.additionalListing.code,
          set: {
            name: item.name,
            shares: item.shares,
            type: item.type,
            listingDate: new Date(item.listingDate)
          }
        })
    )
    await Promise.all(queries)
  }
}
