import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync market participants.
 * @description Updates registered market participants data.
 * @returns Empty promise completion
 */
export async function syncProfileParticipant(): Promise<void> {
  Logger.info('[Sync] Starting syncProfileParticipant...')
  const module = new ParticipantsModule()
  const result = await module.getParticipantSearch(0, 9999)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      Database.insert(schemas.participantProfile)
        .values({
          code: item.code,
          name: item.name,
          license: item.license,
          isPrimary: item.isPrimary
        })
        .onConflictDoUpdate({
          target: schemas.participantProfile.code,
          set: {
            name: item.name,
            license: item.license,
            isPrimary: item.isPrimary
          }
        })
    )
    await Promise.all(queries)
    Logger.info(`[Sync] Completed syncProfileParticipant. Synced ${queries.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncProfileParticipant.')
  }
}
