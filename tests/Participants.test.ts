import { assert } from '@std/assert'
import ParticipantsModule from '@app/Participants/index.ts'

Deno.test('ParticipantsModule - getBrokerSearch (Default)', async () => {
  const module = new ParticipantsModule()
  const result = await module.getBrokerSearch()
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result), 'Result should be an array')
  assert(result.length > 0, 'Should return at least one broker')
  const first = result[0]
  assert(first !== undefined, 'First item should exist')
  assert(typeof first.code === 'string', 'Code should be string')
  assert(typeof first.name === 'string', 'Name should be string')
  assert(typeof first.license === 'string', 'License should be string')
})

Deno.test('ParticipantsModule - getBrokerSearch (Pagination)', async () => {
  const module = new ParticipantsModule()
  const result = await module.getBrokerSearch(0, 5)
  assert(result !== null)
  assert(result.length <= 5, 'Should respect length parameter')
})

Deno.test('ParticipantsModule - getParticipantSearch (Default)', async () => {
  const module = new ParticipantsModule()
  const result = await module.getParticipantSearch()
  assert(result !== null, 'Result should not be null')
  assert(typeof result.recordsTotal === 'number', 'recordsTotal should be number')
  assert(Array.isArray(result.data), 'Data should be an array')
  assert(result.data.length > 0, 'Should return participants')
  const first = result.data[0]
  assert(first !== undefined, 'First item should exist')
  assert(typeof first.code === 'string', 'Code should be string')
  assert(typeof first.name === 'string', 'Name should be string')
  assert(typeof first.license === 'string', 'License should be string')
  assert(typeof first.isPrimary === 'boolean', 'isPrimary should be boolean')
})

Deno.test('ParticipantsModule - getParticipantSearch (Filter by License)', async () => {
  const module = new ParticipantsModule()
  const license = 'Perantara Pedagang Efek'
  const result = await module.getParticipantSearch(0, 10, '', license)
  assert(result !== null)
  if (result.data.length > 0) {
    const first = result.data[0]
    assert(first !== undefined)
  }
})

Deno.test('ParticipantsModule - getParticipantSearch (Search by Code/Name)', async () => {
  const module = new ParticipantsModule()
  const searchTerm = 'Mandiri'
  const result = await module.getParticipantSearch(0, 10, searchTerm)
  assert(result !== null)
  assert(result.data.length > 0, `Should find participants matching '${searchTerm}'`)
  const match = result.data[0]
  assert(match !== undefined, 'Match should exist')
})

Deno.test('ParticipantsModule - getPrimaryDealerSearch (Default)', async () => {
  const module = new ParticipantsModule()
  const result = await module.getPrimaryDealerSearch()
  assert(result !== null)
  assert(Array.isArray(result.data))
  assert(result.data.length > 0, 'Should return primary dealers')
  const first = result.data[0]
  assert(first !== undefined, 'First item should exist')
  assert(typeof first.code === 'string')
  assert(typeof first.name === 'string')
  assert(typeof first.license === 'string')
  assert(first.isPrimary === true, 'isPrimary should be true for primary dealers')
})

Deno.test('ParticipantsModule - getPrimaryDealerSearch (Pagination)', async () => {
  const module = new ParticipantsModule()
  const result = await module.getPrimaryDealerSearch(0, 2)
  assert(result !== null)
  assert(result.data.length <= 2, 'Should respect length limit')
})
