import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Stock split schema.
 * @description Records of stock split and reverse-split events.
 */
export const stockSplit = sqliteTable('stock_split', {
  /** Composite identifier: code-listing_date(unix) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Issuer company name */
  name: text('name'),
  /** Event mechanism type */
  type: text('type'),
  /** Numerical execution ratio */
  ratio: text('ratio'),
  /** Nominal price before split */
  oldNominal: real('old_nominal'),
  /** Nominal price after split */
  newNominal: real('new_nominal'),
  /** Count of additional shares */
  additionalShares: integer('additional_shares'),
  /** Resulting total listed shares */
  listedShares: integer('listed_shares'),
  /** Listing date of new shares */
  listingDate: integer('listing_date', { mode: 'timestamp' }).notNull()
})
