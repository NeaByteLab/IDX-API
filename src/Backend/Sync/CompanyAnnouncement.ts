import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync company announcements.
 * @description Updates latest company announcements.
 * @param date - Target date in YYYYMMDD format
 * @returns Empty promise completion
 */
export async function syncCompanyAnnouncement(date: string): Promise<void> {
  Logger.info('[Sync] Starting syncCompanyAnnouncement...')
  const module = new CompanyModule()
  const result = await module.getAnnouncements('', 9999, 0, date, date)
  if (!result || result.data.length === 0) {
    Logger.warn('[Sync] No data found for syncCompanyAnnouncement.')
    return
  }
  const allValues = result.data.map((item) => ({
    id: item.details.id,
    number: item.details.number,
    date: new Date(item.details.date).getTime(),
    title: item.details.title,
    type: item.details.type,
    companyCode: item.details.companyCode,
    createdDate: new Date(item.details.createdDate).getTime(),
    formId: item.details.formId,
    subject: item.details.subject,
    isStock: item.details.isStock,
    isBond: item.details.isBond,
    attachments: JSON.stringify(item.attachments)
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
        Database.insert(schemas.companyAnnouncement).values(values).onConflictDoUpdate({
          target: schemas.companyAnnouncement.id,
          set: values
        })
      )
    )
  }
  Logger.info(`[Sync] Completed syncCompanyAnnouncement. Synced ${allValues.length} records.`)
}
