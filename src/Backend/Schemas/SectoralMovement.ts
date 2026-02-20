import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Sectoral movement performance schema.
 * @description Historical sectoral comparison and performance data.
 */
export const sectoralMovement = sqliteTable('sectoral_movement', {
  /** Composite identifier: name-date(unix) */
  id: text('id').primaryKey(),
  /** Specific sector name string */
  name: text('name').notNull(),
  /** Performance measurement date */
  date: integer('date').notNull(),
  /** Percentage change measurement points */
  change: real('change').notNull(),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
