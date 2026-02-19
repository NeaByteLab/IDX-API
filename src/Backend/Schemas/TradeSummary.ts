import { integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Trade Summary schema.
 * @description Market segment trading data (volume, value, freq) by date.
 */
export const tradeSummary = sqliteTable(
  'trade_summary',
  {
    id: text('id').notNull(),
    volume: integer('volume').notNull(),
    value: real('value').notNull(),
    frequency: integer('frequency').notNull(),
    date: integer('date', { mode: 'timestamp' }).notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.date] })
  })
)
