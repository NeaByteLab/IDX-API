import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync sectoral movement.
 * @description Updates performance metrics for various market sectors.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncSectoralMovement(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncSectoralMovement for ${year}-${month}...`)
  const market = new MarketModule()
  const result = await market.getSectoralMovement(year, month)
  if (result && result.series.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.series.flatMap((series) =>
      series.points.map((point) => ({
        period,
        id: `${series.name}-${new Date(point.date).getTime()}`,
        name: series.name,
        date: new Date(point.date).getTime(),
        change: point.change
      }))
    )
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.sectoralMovement)
            .values(values)
            .onConflictDoUpdate({
              target: schemas.sectoralMovement.id,
              set: { change: values.change }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncSectoralMovement. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncSectoralMovement for ${year}-${month}.`)
  }
}
