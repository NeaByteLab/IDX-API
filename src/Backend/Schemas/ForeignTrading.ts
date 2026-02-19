import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core'

/**
 * Foreign investor trading schema.
 * @description Monthly metrics for foreign investors.
 */
export const foreignTrading = sqliteTable('foreign_trading', {
  /** Record statement date identification */
  date: integer('date', { mode: 'timestamp' }).primaryKey(),
  /** Aggregate buy volume */
  buyVolume: integer('buy_volume').notNull(),
  /** Aggregate buy value */
  buyValue: real('buy_value').notNull(),
  /** Total buy frequency */
  buyFrequency: integer('buy_frequency').notNull(),
  /** Aggregate sell volume */
  sellVolume: integer('sell_volume').notNull(),
  /** Aggregate sell value */
  sellValue: real('sell_value').notNull(),
  /** Total sell frequency */
  sellFrequency: integer('sell_frequency').notNull()
})
