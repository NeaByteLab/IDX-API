import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync stock splits.
 * @description Updates stock split and reverse-split events.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncStockSplit(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getStockSplits(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) => {
      const id = `${item.code}-${new Date(item.listingDate).getTime()}`
      const values = {
        id,
        code: item.code,
        name: item.name,
        type: item.type,
        ratio: item.ratio,
        oldNominal: item.oldNominal,
        newNominal: item.newNominal,
        additionalShares: item.additionalShares,
        listedShares: item.listedShares,
        listingDate: new Date(item.listingDate)
      }
      return db.insert(schemas.stockSplit).values(values).onConflictDoUpdate({
        target: schemas.stockSplit.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
