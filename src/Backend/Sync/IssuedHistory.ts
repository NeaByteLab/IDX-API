import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync issued history.
 * @description Updates share issuance history for a company.
 * @param code - Company ticker code
 * @returns Empty promise completion
 */
export async function syncIssuedHistory(code: string): Promise<void> {
  Logger.info(`[Sync] Starting syncIssuedHistory for ${code}...`)
  const company = new CompanyModule()
  const result = await company.getIssuedHistory(code)
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: item.id,
      code: item.code,
      date: item.date,
      type: item.type,
      shares: item.shares,
      totalShares: item.totalShares
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
          Database.insert(schemas.issuedHistory).values(values).onConflictDoUpdate({
            target: schemas.issuedHistory.id,
            set: values
          })
        )
      )
    }
    Logger.info(
      `[Sync] Completed syncIssuedHistory for ${code}. Synced ${allValues.length} records.`
    )
  } else {
    Logger.warn(`[Sync] No data found for syncIssuedHistory for ${code}.`)
  }
}
