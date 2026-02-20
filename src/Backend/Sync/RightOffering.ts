import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import Database from '@app/Database.ts'
import Logger from '@app/Logger.ts'

/**
 * Sync right offerings.
 * @description Updates shares subscription right offering events.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncRightOffering(year: number, month: number): Promise<void> {
  Logger.info(`[Sync] Starting syncRightOffering for ${year}-${month}...`)
  const module = new CompanyModule()
  const result = await module.getRightOfferings(year, month)
  if (result && result.data.length > 0) {
    const period = new Date(year, month - 1, 1).getTime()
    const allValues = result.data.map((item) => ({
      id: `${item.code}-${new Date(item.recordingDate).getTime()}`,
      code: item.code,
      name: item.name,
      ratio: item.ratio,
      exercisePrice: item.exercisePrice,
      fundRaised: item.fundRaised,
      exerciseDate: item.exerciseDate ? new Date(item.exerciseDate).getTime() : null,
      recordingDate: new Date(item.recordingDate).getTime(),
      tradingPeriod: item.tradingPeriod,
      period
    }))
    const chunkSize = 1000
    const chunkGenerator = async function* (): AsyncGenerator<(typeof allValues)[0][]> {
      for (let i = 0; i < allValues.length; i += chunkSize) {
        yield allValues.slice(i, i + chunkSize)
      }
    }
    for await (const chunk of chunkGenerator()) {
      await Promise.all(
        chunk.map((values) =>
          Database.insert(schemas.rightOffering)
            .values(values)
            .onConflictDoUpdate({
              target: schemas.rightOffering.id,
              set: {
                exercisePrice: values.exercisePrice,
                fundRaised: values.fundRaised
              }
            })
        )
      )
    }
    Logger.info(`[Sync] Completed syncRightOffering. Synced ${allValues.length} records.`)
  } else {
    Logger.warn(`[Sync] No data found for syncRightOffering for ${year}-${month}.`)
  }
}
