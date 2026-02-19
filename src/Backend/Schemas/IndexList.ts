import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Market index list schema.
 * @description Snapshots of all market indices.
 */
export const indexList = sqliteTable('index_list', {
  /** Unique index identification code */
  code: text('code').primaryKey(),
  /** Last recorded closing price */
  close: text('close'),
  /** Price change value string */
  change: text('change'),
  /** Percentage price change string */
  percent: text('percent'),
  /** Current live index value */
  current: text('current')
})
