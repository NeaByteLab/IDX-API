import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schemas from '@app/Backend/Schemas/index.ts'

/**
 * Database access instance.
 * @description Exports the Drizzle ORM instance for database operations.
 */
export const db = drizzle(
  createClient({
    url: import.meta.resolve('@data/database.sqlite')
  }),
  { schema: schemas }
)
