import * as schemas from '@app/Backend/Schemas/index.ts'
import MarketModule from '@app/Market/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync index chart data.
 * @description Updates historical chart points for index.
 * @param indexCode - Target index
 * @returns Empty promise completion
 */
export async function syncIndexChart(indexCode: string): Promise<void> {
  const market = new MarketModule()
  const result = await market.getIndexChart(indexCode)
  if (result && result.chartData.length > 0) {
    const queries = result.chartData.map((point) => {
      const id = `${indexCode}-${new Date(point.date).getTime()}`
      const values = {
        id,
        code: indexCode,
        date: new Date(point.date),
        value: point.value
      }
      return db
        .insert(schemas.indexChart)
        .values(values)
        .onConflictDoUpdate({
          target: schemas.indexChart.id,
          set: { value: point.value }
        })
    })
    await Promise.all(queries)
  }
}
