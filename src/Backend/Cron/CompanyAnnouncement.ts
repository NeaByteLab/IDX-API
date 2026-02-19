import * as schemas from '@app/Backend/Schemas/index.ts'
import CompanyModule from '@app/Company/index.ts'
import { db } from '@app/Database.ts'

/**
 * Sync company announcements.
 * @description Fetches and updates latest announcements.
 * @returns Empty promise completion
 */
export async function syncCompanyAnnouncement(): Promise<void> {
  const module = new CompanyModule()
  const result = await module.getAnnouncements('', 100, 0)
  if (!result || result.data.length === 0) {
    return
  }
  const queries = result.data.map((item) =>
    db
      .insert(schemas.companyAnnouncement)
      .values({
        id: item.details.id,
        number: item.details.number,
        date: item.details.date,
        title: item.details.title,
        type: item.details.type,
        companyCode: item.details.companyCode,
        createdDate: item.details.createdDate,
        formId: item.details.formId,
        subject: item.details.subject,
        isStock: item.details.isStock,
        isBond: item.details.isBond,
        attachments: JSON.stringify(item.attachments)
      })
      .onConflictDoUpdate({
        target: schemas.companyAnnouncement.id,
        set: {
          number: item.details.number,
          date: item.details.date,
          title: item.details.title,
          type: item.details.type,
          companyCode: item.details.companyCode,
          createdDate: item.details.createdDate,
          formId: item.details.formId,
          subject: item.details.subject,
          isStock: item.details.isStock,
          isBond: item.details.isBond,
          attachments: JSON.stringify(item.attachments)
        }
      })
  )
  await Promise.all(queries)
}
