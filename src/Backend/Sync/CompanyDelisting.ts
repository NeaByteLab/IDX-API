import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync company delistings.
 * @description Updates stocks removed from exchange for period.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncCompanyDelisting(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getDelistings(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.companyDelisting)
        .values({
          code: item.code,
          name: item.name,
          listingDate: item.listingDate ? new Date(item.listingDate) : null,
          delistingDate: new Date(item.delistingDate)
        })
        .onConflictDoUpdate({
          target: schemas.companyDelisting.code,
          set: {
            name: item.name,
            listingDate: item.listingDate ? new Date(item.listingDate) : null,
            delistingDate: new Date(item.delistingDate)
          }
        })
    )
    await Promise.all(queries)
  }
}
