import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * New listing IPO schema.
 * @description Stores IPO data for new companies.
 */
export const newListing = sqliteTable('new_listing', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer company name */
  name: text('name').notNull(),
  /** Existing shares before IPO */
  listedShares: integer('listed_shares'),
  /** Count of shares offered to public */
  offeringShares: integer('offering_shares').notNull(),
  /** IPO offering price value */
  offeringPrice: real('offering_price').notNull(),
  /** Total numeric funds raised */
  fundRaised: real('fund_raised'),
  /** Official listing date on exchange */
  listingDate: integer('listing_date').notNull(),
  /** Monthly period identifier */
  period: integer('period').notNull()
})
