import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company announcement schema.
 * @description Stores IDX listed company news and announcements.
 */
export const companyAnnouncement = sqliteTable('company_announcement', {
  id: text('id').primaryKey(),
  number: text('number').notNull(),
  date: text('date').notNull(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  companyCode: text('company_code').notNull(),
  createdDate: text('created_date').notNull(),
  formId: text('form_id').notNull(),
  subject: text('subject'),
  isStock: integer('is_stock', { mode: 'boolean' }).notNull(),
  isBond: integer('is_bond', { mode: 'boolean' }).notNull(),
  attachments: text('attachments')
})
