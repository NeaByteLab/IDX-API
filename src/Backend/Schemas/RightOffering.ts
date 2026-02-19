import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Right offering schema.
 * @description Stores records of shares subscription offerings.
 */
export const rightOffering = sqliteTable('right_offering', {
  /** Composite identifier: code-recording_date(unix) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Issuer company name */
  name: text('name'),
  /** Subscription execution ratio */
  ratio: text('ratio'),
  /** Target execution price */
  exercisePrice: real('exercise_price'),
  /** Target numeric funds raised */
  fundRaised: real('fund_raised'),
  /** Date shares go ex-rights */
  exerciseDate: integer('exercise_date', { mode: 'timestamp' }),
  /** Cutoff shareholders recording date */
  recordingDate: integer('recording_date', { mode: 'timestamp' }),
  /** Rights trading window text */
  tradingPeriod: text('trading_period')
})
