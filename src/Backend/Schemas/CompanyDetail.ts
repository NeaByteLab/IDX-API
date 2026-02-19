import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company detail schema.
 * @description Stores exhaustive information for listed companies.
 */
export const companyDetail = sqliteTable('company_detail', {
  code: text('code').primaryKey(),
  address: text('address'),
  bae: text('bae'),
  industry: text('industry'),
  subIndustry: text('sub_industry'),
  email: text('email'),
  fax: text('fax'),
  businessActivity: text('business_activity'),
  phone: text('phone'),
  website: text('website'),
  npwp: text('npwp'),
  history: text('history'),
  board: text('board'),
  sector: text('sector'),
  subSector: text('sub_sector'),
  status: text('status'),
  secretary: text('secretary'),
  directors: text('directors'),
  commissioners: text('commissioners'),
  committees: text('committees'),
  shareholders: text('shareholders'),
  subsidiaries: text('subsidiaries')
})
