import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync registered brokers.
 * @description Updates exchange member brokers data.
 * @returns Empty promise completion
 */
export async function syncBrokerParticipant(): Promise<void> {
  const module = new ParticipantsModule()
  const result = await module.getBrokerSearch()
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      db
        .insert(schemas.participantBroker)
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
  }
}
