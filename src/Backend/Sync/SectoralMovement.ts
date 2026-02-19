import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync sectoral movement.
 * @description Updates sectoral comparison data for period.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncSectoralMovement(year: number, month: number): Promise<void> {
  const market = new MarketModule()
  const result = await market.getSectoralMovement(year, month)
  if (result && result.series.length > 0) {
    const queries = result.series.flatMap((series) =>
      series.points.map((point) => {
        const id = `${series.name}-${new Date(point.date).getTime()}`
        const values = {
          id,
          name: series.name,
          date: new Date(point.date),
          change: point.change
        }
        return db
          .insert(schemas.sectoralMovement)
          .values(values)
          .onConflictDoUpdate({
            target: schemas.sectoralMovement.id,
            set: { change: point.change }
          })
      })
    )
    await Promise.all(queries)
  }
}
