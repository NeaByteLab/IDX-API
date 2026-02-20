import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Broker summary schema.
 * @description Mirror of BrokerSummary from IDX API.
 */
export const brokerSummary = sqliteTable('broker_summary', {
  /** Unique record identifier */
  id: integer('id').primaryKey(),
  /** Record statement date */
  date: integer('date').notNull(),
  /** Unique firm identifier */
  brokerCode: text('broker_code').notNull(),
  /** Registered firm name */
  brokerName: text('broker_name'),
  /** Aggregate trade value */
  totalValue: real('total_value').notNull(),
  /** Aggregate trade volume */
  volume: integer('volume').notNull(),
  /** Total trade frequency */
  frequency: integer('frequency').notNull()
})
