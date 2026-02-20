import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company detail schema.
 * @description Stores detailed info for listed companies.
 */
export const companyDetail = sqliteTable('company_detail', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Physical head office address */
  address: text('address'),
  /** Biro Administrasi Efek */
  bae: text('bae'),
  /** General industry category */
  industry: text('industry'),
  /** Specific sub-industry category */
  subIndustry: text('sub_industry'),
  /** Official corporate email */
  email: text('email'),
  /** Official corporate fax */
  fax: text('fax'),
  /** Detailed business description */
  businessActivity: text('business_activity'),
  /** Official corporate phone */
  phone: text('phone'),
  /** Official company website */
  website: text('website'),
  /** Tax identification number */
  npwp: text('npwp'),
  /** Brief company history */
  history: text('history'),
  /** Listing board category */
  board: text('board'),
  /** Market sector category */
  sector: text('sector'),
  /** Market sub-sector category */
  subSector: text('sub_sector'),
  /** Current listing status */
  status: text('status'),
  /** Corporate secretary details */
  secretary: text('secretary'),
  /** Board of directors */
  directors: text('directors'),
  /** Board of commissioners */
  commissioners: text('commissioners'),
  /** Internal audit committees */
  committees: text('committees'),
  /** Major shareholders list */
  shareholders: text('shareholders'),
  /** Controlled subsidiary companies */
  subsidiaries: text('subsidiaries')
})
