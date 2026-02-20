import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Market calendar aggregate schema.
 * @description Stores corporate and market events calendar.
 */
export const marketCalendar = sqliteTable('market_calendar', {
  /** API native record identifier */
  id: integer('id').primaryKey(),
  /** Event ticker or company code */
  code: text('code').notNull(),
  /** Event classification type */
  type: text('type'),
  /** Detailed event description text */
  description: text('description'),
  /** Event location or meeting link */
  location: text('location'),
  /** Current process status step */
  step: text('step'),
  /** Event starting timestamp */
  date: integer('date').notNull(),
  /** Agenda year numeric record */
  year: text('year')
})
