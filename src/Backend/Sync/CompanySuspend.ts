import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync company suspensions.
 * @description Updates trading suspension and unsuspension events.
 * @returns Empty promise completion
 */
export async function syncCompanySuspend(): Promise<void> {
  Logger.info('[Sync] Starting syncCompanySuspend...')
  const module = new CompanyModule()
  const result = await module.getSuspendData()
  if (result && result.results.length > 0) {
    const allValues = result.results.map((item) => ({
      id: `${item.code}-${new Date(item.date).getTime()}`,
      code: item.code,
      title: item.title,
      date: new Date(item.date).getTime(),
      type: item.type,
      downloadUrl: item.downloadUrl
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
          Database.insert(schemas.companySuspend).values(values).onConflictDoUpdate({
            target: schemas.companySuspend.id,
            set: values
          })
        )
      )
    }
    Logger.info(`[Sync] Completed syncCompanySuspend. Synced ${allValues.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncCompanySuspend.')
  }
}
