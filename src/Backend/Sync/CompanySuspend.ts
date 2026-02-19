import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync company suspensions.
 * @description Updates trading suspension and unsuspension events.
 * @returns Empty promise completion
 */
export async function syncCompanySuspend(): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getSuspendData()
  if (result && result.results.length > 0) {
    const queries = result.results.map((item) => {
      const id = `${item.code}-${new Date(item.date).getTime()}`
      const values = {
        id,
        code: item.code,
        title: item.title,
        date: new Date(item.date),
        type: item.type,
        downloadUrl: item.downloadUrl
      }
      return db.insert(schemas.companySuspend).values(values).onConflictDoUpdate({
        target: schemas.companySuspend.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
