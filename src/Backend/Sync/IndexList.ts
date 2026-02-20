import * as schemas from '@app/Backend/Schemas/index.ts'
import { syncIndexChart } from '@app/Backend/Sync/IndexChart.ts'
import MarketModule from '@app/Market/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync index list.
 * @description Updates market indices and their charts.
 * @returns Empty promise completion
 */
export async function syncIndexList(): Promise<void> {
  Logger.info('[Sync] Starting syncIndexList...')
  const market = new MarketModule()
  const result = await market.getIndexList()
  if (!result || result.length === 0) {
    Logger.warn('[Sync] No data found for syncIndexList.')
    return
  }
  const queries = result.map((item) =>
    Database.insert(schemas.indexList)
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
  Logger.info(
    `[Sync] Completed syncIndexList list. Synced ${queries.length} records. Starting charts sync...`
  )
  /**
   * Sync index charts.
   * @description Processes indices one by one sequentially.
   * @param index - Current index
   */
  const syncCharts = async (index: number): Promise<void> => {
    const item = result[index]
    if (!item || index >= result.length) {
      return
    }
    await syncIndexChart(item.code)
    await new Promise((resolve) => setTimeout(resolve, 500))
    return await syncCharts(index + 1)
  }
  await syncCharts(0)
  Logger.info('[Sync] Completed syncIndexList.')
}
