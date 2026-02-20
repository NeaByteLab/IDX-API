import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync index chart data.
 * @description Updates historical chart points for index.
 * @param indexCode - Target index
 * @returns Empty promise completion
 */
export async function syncIndexChart(indexCode: string): Promise<void> {
  Logger.info(`[Sync] Starting syncIndexChart for ${indexCode}...`)
  const market = new MarketModule()
  const result = await market.getIndexChart(indexCode, '1Y')
  if (result && result.chartData.length > 0) {
    const values = result.chartData
      .filter((point) => point.value !== null && point.value !== undefined)
      .map((point) => ({
        id: `${indexCode}-${new Date(point.date).getTime()}`,
        code: indexCode,
        date: new Date(point.date).getTime(),
        value: point.value
      }))
    if (values.length === 0) {
      Logger.warn(`[Sync] No valid chart points found for syncIndexChart for ${indexCode}.`)
      return
    }
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof values)[0][]> {
      for (let i = 0; i < values.length; i += chunkSize) {
        yield values.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((v) =>
          Database.insert(schemas.indexChart)
            .values(v)
            .onConflictDoUpdate({
              target: schemas.indexChart.id,
              set: {
                value: v.value,
                code: v.code
              }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncIndexChart. Synced ${values.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncIndexChart for ${indexCode}.`)
  }
}
