import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync right offerings.
 * @description Updates shares subscription right offering events.
 * @param year - Target year
 * @param month - Target month
 * @returns Empty promise completion
 */
export async function syncRightOffering(year: number, month: number): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getRightOfferings(year, month)
  if (result && result.data.length > 0) {
    const queries = result.data.map((item) => {
      const id = `${item.code}-${new Date(item.recordingDate).getTime()}`
      const values = {
        id,
        code: item.code,
        name: item.name,
        ratio: item.ratio,
        exercisePrice: item.exercisePrice,
        fundRaised: item.fundRaised,
        exerciseDate: item.exerciseDate ? new Date(item.exerciseDate) : null,
        recordingDate: new Date(item.recordingDate),
        tradingPeriod: item.tradingPeriod
      }
      return db.insert(schemas.rightOffering).values(values).onConflictDoUpdate({
        target: schemas.rightOffering.id,
        set: values
      })
    })
    await Promise.all(queries)
  }
}
