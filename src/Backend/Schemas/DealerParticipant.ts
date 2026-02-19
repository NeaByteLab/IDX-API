import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Default boolean value.
 * @description Default is false.
 */
const defaultBool = false

/**
 * Primary dealer schema.
 * @description Stores registered primary dealer participants.
 */
export const participantDealer = sqliteTable('participant_dealer', {
  /** Dealer firm identifier */
  code: text('code').primaryKey(),
  /** Full dealer company name */
  name: text('name').notNull(),
  /** Dealer operational license number */
  license: text('license'),
  /** Primary dealer status flag */
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(defaultBool)
})
