import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync new listings IPO.
 * @description Updates newly listed companies on exchange.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncNewListing(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getNewListings(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.newListing)
        .values({
          code: item.code,
          name: item.name,
          listedShares: item.listedShares,
          offeringShares: item.offeringShares,
          offeringPrice: item.offeringPrice,
          fundRaised: item.fundRaised,
          listingDate: new Date(item.listingDate)
        })
        .onConflictDoUpdate({
          target: schemas.newListing.code,
          set: {
            name: item.name,
            listedShares: item.listedShares,
            offeringShares: item.offeringShares,
            offeringPrice: item.offeringPrice,
            fundRaised: item.fundRaised,
            listingDate: new Date(item.listingDate)
          }
        })
    )
    await Promise.all(queries)
  }
}
