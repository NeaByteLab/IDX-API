import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync company profiles.
 * @description Updates listing data with exhaustive metadata.
 * @returns Empty promise completion
 */
export async function syncCompanyProfile(): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getCompanyProfiles()
  if (!result || result.data.length === 0) {
    return
  }
  const profileQueries = result.data.map((item) => {
    const listingDate = item.listingDate ? new Date(item.listingDate) : null
    return db
      .insert(schemas.companyProfile)
      .values({ code: item.code, name: item.name, listingDate })
      .onConflictDoUpdate({
        target: schemas.companyProfile.code,
        set: { name: item.name, listingDate }
      })
  })
  await Promise.all(profileQueries)
  /**
   * Fetch company details.
   * @description Processes companies one by one sequentially.
   * @param index - Current index
   */
  const syncDetails = async (index: number): Promise<void> => {
    const item = result.data[index]
    if (!item || index >= result.data.length) {
      return
    }
    const detail = await module.getCompanyProfilesDetail(item.code)
    if (detail) {
      const values = {
        code: detail.profile.code,
        address: detail.profile.address,
        bae: detail.profile.bae,
        industry: detail.profile.industry,
        subIndustry: detail.profile.subIndustri,
        email: detail.profile.email,
        fax: detail.profile.fax,
        businessActivity: detail.profile.businessActivity,
        phone: detail.profile.phone,
        website: detail.profile.website,
        npwp: detail.profile.npwp,
        history: detail.profile.history,
        board: detail.profile.board,
        sector: detail.profile.sector,
        subSector: detail.profile.subSector,
        status: detail.profile.status,
        secretary: JSON.stringify(detail.secretary),
        directors: JSON.stringify(detail.directors),
        commissioners: JSON.stringify(detail.commissioners),
        committees: JSON.stringify(detail.committees),
        shareholders: JSON.stringify(detail.shareholders),
        subsidiaries: JSON.stringify(detail.subsidiaries)
      }
      await db.insert(schemas.companyDetail).values(values).onConflictDoUpdate({
        target: schemas.companyDetail.code,
        set: values
      })
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    return await syncDetails(index + 1)
  }
  await syncDetails(0)
}
