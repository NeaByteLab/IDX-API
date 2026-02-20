import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Industry trading summary schema.
 * @description Trading activities aggregated by industry area.
 */
export const industryTrading = sqliteTable('industry_trading', {
  /** Composite identifier: industry-date(unix) */
  id: text('id').primaryKey(),
  /** Statement record date */
  date: integer('date').notNull(),
  /** Industry or sectoral classification name */
  industry: text('industry').notNull(),
  /** Number of member companies in industry */
  members: integer('members'),
  /** Total listed shares for the industry */
  shares: integer('shares'),
  /** Total numeric market capitalization */
  marketCap: real('market_cap'),
  /** Trading volume in thousand shares */
  volume: real('volume'),
  /** Trading value in million IDR */
  value: real('value'),
  /** Total aggregate trade frequency */
  frequency: integer('frequency'),
  /** Price to Earnings Ratio average */
  per: real('per'),
  /** Price to Book Value average */
  pbv: real('pbv'),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
