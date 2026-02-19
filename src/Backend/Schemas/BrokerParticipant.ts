import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Exchange member broker schema.
 * @description Stores registered exchange brokers.
 */
export const participantBroker = sqliteTable('participant_broker', {
  /** Exchange member code */
  code: text('code').primaryKey(),
  /** Full broker company name */
  name: text('name').notNull(),
  /** Broker operational license number */
  license: text('license')
})
