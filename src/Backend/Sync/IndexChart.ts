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
  const result = await market.getIndexChart(indexCode, '1Y')
  if (result && result.chartData.length > 0) {
    const values = result.chartData
      .filter((point) => point.value !== null && point.value !== undefined)
      .map((point) => ({
        id: `${indexCode}-${new Date(point.date).getTime()}`,
        code: indexCode,
        date: new Date(point.date),
        value: point.value
      }))
    if (values.length === 0) {
      return
    }
    await db
      .insert(schemas.indexChart)
      .values(values)
      .onConflictDoUpdate({
        target: schemas.indexChart.id,
        set: {
          value: schemas.indexChart.value,
          code: schemas.indexChart.code
        }
      })
  }
}
