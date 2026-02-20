import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync primary dealers.
 * @description Updates registered primary dealers data.
 * @returns Empty promise completion
 */
export async function syncDealerParticipant(): Promise<void> {
  Logger.info('[Sync] Starting syncDealerParticipant...')
  const module = new ParticipantsModule()
  const result = await module.getPrimaryDealerSearch(0, 9999)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      Database.insert(schemas.participantDealer)
        .values({
          code: item.code,
          name: item.name,
          license: item.license,
          isPrimary: item.isPrimary
        })
        .onConflictDoUpdate({
          target: schemas.participantDealer.code,
          set: {
            name: item.name,
            license: item.license,
            isPrimary: item.isPrimary
          }
        })
    )
    await Promise.all(queries)
    Logger.info(`[Sync] Completed syncDealerParticipant. Synced ${queries.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncDealerParticipant.')
  }
}
