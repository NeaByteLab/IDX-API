import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync registered brokers.
 * @description Updates exchange member brokers data.
 * @returns Empty promise completion
 */
export async function syncBrokerParticipant(): Promise<void> {
  Logger.info('[Sync] Starting syncBrokerParticipant...')
  const module = new ParticipantsModule()
  const result = await module.getBrokerSearch()
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      Database.insert(schemas.participantBroker)
        .values({
          code: item.code,
          name: item.name,
          license: item.license
        })
        .onConflictDoUpdate({
          target: schemas.participantBroker.code,
          set: {
            name: item.name,
            license: item.license
          }
        })
    )
    await Promise.all(queries)
    Logger.info(`[Sync] Completed syncBrokerParticipant. Synced ${queries.length} records.`)
  } else {
    Logger.warn('[Sync] No data found for syncBrokerParticipant.')
  }
}
