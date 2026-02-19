import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import { db } from '@app/Database.ts'
import { syncIndexChart } from '@app/Backend/Sync/IndexChart.ts'

/**
 * Sync index list.
 * @description Updates market indices and their charts.
 * @returns Empty promise completion
 */
export async function syncIndexList(): Promise<void> {
  const market = new MarketModule()
  const result = await market.getIndexList()
  if (result && result.length > 0) {
    const queries = result.map((item) =>
      db
        .insert(schemas.indexList)
        .values({
          code: item.code,
          close: item.close,
          change: item.change,
          percent: item.percent,
          current: item.current
        })
        .onConflictDoUpdate({
          target: schemas.indexList.code,
          set: {
            close: item.close,
            change: item.change,
            percent: item.percent,
            current: item.current
          }
        })
    )
    await Promise.all(queries)

    // Automatically sync chart for each index in parallel
    const chartSyncs = result.map((item) => syncIndexChart(item.code))
    await Promise.all(chartSyncs)
  }
}
