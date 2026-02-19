import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Default boolean value.
 * @description Default is false.
 */
const defaultBool = false

/**
 * Market participant profile schema.
 * @description Stores registered general market participants.
 */
export const participantProfile = sqliteTable('participant_profile', {
  /** Participant identification code */
  code: text('code').primaryKey(),
  /** Full participant company name */
  name: text('name').notNull(),
  /** Participant operational license number */
  license: text('license'),
  /** Lead participant status flag */
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(defaultBool)
})
