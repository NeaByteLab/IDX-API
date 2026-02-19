import * as schemas from '@app/Backend/Schemas/index.ts'
import ParticipantsModule from '@app/Participants/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync primary dealers.
 * @description Fetches and updates primary dealers.
 * @returns Empty promise completion
 */
export async function syncDealerParticipant(): Promise<void> {
  const module = new ParticipantsModule()
  const result = await module.getPrimaryDealerSearch(0, 9999)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) =>
      db
        .insert(schemas.participantDealer)
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
  }
}
