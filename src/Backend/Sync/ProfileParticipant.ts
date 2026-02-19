import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync market participants.
 * @description Updates registered market participants data.
 * @returns Empty promise completion
 */
export async function syncProfileParticipant(): Promise<void> {
  const module = new ParticipantsModule()
  const result = await module.getParticipantSearch(0, 9999)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.participantProfile)
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
  }
}
