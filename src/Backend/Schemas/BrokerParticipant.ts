import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Exchange member broker schema.
 * @description Stores registered exchange brokers.
 */
export const participantBroker = sqliteTable('participant_broker', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
  license: text('license')
})
