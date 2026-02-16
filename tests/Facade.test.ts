import { assert } from '@std/assert'
import IDXClient from '@app/index.ts'

Deno.test('IDXClient - Initialization', () => {
  const client = new IDXClient()
  assert(client.company !== undefined)
  assert(client.market !== undefined)
  assert(client.statistics !== undefined)
  assert(client.trading !== undefined)
})
