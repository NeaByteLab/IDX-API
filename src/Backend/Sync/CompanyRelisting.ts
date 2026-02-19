import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync company relistings.
 * @description Updates companies returning to exchange.
 * @returns Empty promise completion
 */
export async function syncCompanyRelisting(): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getRelistingData()
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.companyRelisting)
        .values({
          code: item.code,
          name: item.name,
          listingDate: new Date(item.listingDate)
        })
        .onConflictDoUpdate({
          target: schemas.companyRelisting.code,
          set: {
            name: item.name,
            listingDate: new Date(item.listingDate)
          }
        })
    )
    await Promise.all(queries)
  }
}
