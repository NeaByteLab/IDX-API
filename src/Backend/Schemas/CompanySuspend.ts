import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company suspension schema.
 * @description Records of trading suspension events.
 */
export const companySuspend = sqliteTable('company_suspend', {
  /** Composite identifier: code-date(unix) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Detailed suspension title */
  title: text('title'),
  /** Suspension event timestamp */
  date: integer('date').notNull(),
  /** Action type: Suspend or Unsuspend */
  type: text('type'),
  /** Link to original announcement PDF */
  downloadUrl: text('download_url')
})
