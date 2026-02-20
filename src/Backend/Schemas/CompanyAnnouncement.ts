import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company announcement schema.
 * @description Stores IDX listed company announcements.
 */
export const companyAnnouncement = sqliteTable('company_announcement', {
  /** Unique announcement identifier */
  id: text('id').primaryKey(),
  /** Official announcement number */
  number: text('number').notNull(),
  /** Posting date string */
  date: integer('date').notNull(),
  /** Announcement title text */
  title: text('title').notNull(),
  /** Announcement type category */
  type: text('type').notNull(),
  /** Associated company ticker */
  companyCode: text('company_code').notNull(),
  /** Record creation date */
  createdDate: integer('created_date').notNull(),
  /** Internal form identifier */
  formId: text('form_id').notNull(),
  /** Announcement subject description */
  subject: text('subject'),
  /** Instrument stock flag */
  isStock: integer('is_stock', { mode: 'boolean' }).notNull(),
  /** Instrument bond flag */
  isBond: integer('is_bond', { mode: 'boolean' }).notNull(),
  /** JSON attachments list */
  attachments: text('attachments')
})
