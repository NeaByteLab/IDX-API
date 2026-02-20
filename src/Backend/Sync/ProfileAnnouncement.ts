import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync profile announcements.
 * @description Updates profile change announcements for a company.
 * @param code - Company ticker code
 * @returns Empty promise completion
 */
export async function syncProfileAnnouncement(code: string): Promise<void> {
  Logger.info(`[Sync] Starting syncProfileAnnouncement for ${code}...`)
  const company = new CompanyModule()
  const result = await company.getProfileAnnouncements(code)
  if (result && result.length > 0) {
    const allValues = result.map((item) => ({
      id: item.number,
      date: item.date,
      title: item.title,
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
          Database.insert(schemas.profileAnnouncement).values(values).onConflictDoUpdate({
            target: schemas.profileAnnouncement.id,
            set: values
          })
        )
      )
    }
    Logger.info(
      `[Sync] Completed syncProfileAnnouncement for ${code}. Synced ${allValues.length} records.`
    )
  } else {
    Logger.warn(`[Sync] No data found for syncProfileAnnouncement for ${code}.`)
  }
}
