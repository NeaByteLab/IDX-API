import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Default boolean value.
 * @description Default is false.
 */
const defaultBool = false

/**
 * Primary dealer schema.
 * @description Stores primary dealer participants.
 */
export const participantDealer = sqliteTable('participant_dealer', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
  license: text('license'),
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(defaultBool)
})
