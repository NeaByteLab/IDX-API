import { integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Trade summary schema.
 * @description Market segment trading data by date.
 */
export const tradeSummary = sqliteTable(
  'trade_summary',
  {
    /** Market segment type identifier */
    id: text('id').notNull(),
    /** Aggregate segment trade volume */
    volume: integer('volume').notNull(),
    /** Aggregate segment trade value */
    value: real('value').notNull(),
    /** Total segment trade frequency */
    frequency: integer('frequency').notNull(),
    /** Record statement date identification */
    date: integer('date', { mode: 'timestamp' }).notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.date] })
  })
)
