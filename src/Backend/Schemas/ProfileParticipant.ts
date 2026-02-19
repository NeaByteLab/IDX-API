import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Default boolean value.
 * @description Default is false.
 */
const defaultBool = false

/**
 * Market participant schema.
 * @description Stores general market participants.
 */
export const participantProfile = sqliteTable('participant_profile', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
  license: text('license'),
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(defaultBool)
})
