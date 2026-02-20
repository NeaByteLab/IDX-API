import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Profile announcement schema.
 * @description Stores records for company profile update announcements.
 */
export const profileAnnouncement = sqliteTable('profile_announcement', {
  /** Official announcement number as unique ID */
  id: text('id').primaryKey(),
  /** Announcement timestamp string */
  date: text('date').notNull(),
  /** Announcement title text */
  title: text('title').notNull(),
  /** JSON string of file attachments */
  attachments: text('attachments')
})
