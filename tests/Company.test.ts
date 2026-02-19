import { assert } from '@std/assert'
import CompanyModule from '@app/Company/index.ts'

Deno.test('CompanyModule - getAnnouncements', async () => {
  const module = new CompanyModule()
  const result = await module.getAnnouncements('BBCA', 10, 0, '20200101', '20261231')
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result.data), 'data should be an array')
  if (result.data.length > 0) {
    assert(result.data[0].details.companyCode === 'BBCA', 'Should be BBCA')
  }
})

Deno.test('CompanyModule - getCompanyProfiles', async () => {
  const module = new CompanyModule()
  const result = await module.getCompanyProfiles(0, 5)
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result.data), 'data should be an array')
  assert(result.data.length > 0, 'Should return at least one profile')
  const first = result.data[0]
  assert(first !== undefined, 'First item should exist')
  assert(typeof first.code === 'string', 'Code should be string')
  assert(typeof first.name === 'string', 'Name should be string')
})

Deno.test('CompanyModule - getCompanyProfilesDetail', async () => {
  const module = new CompanyModule()
  const result = await module.getCompanyProfilesDetail('BBCA')
  assert(result !== null, 'Result should not be null')
  assert(result.profile.code === 'BBCA', 'Code should match')
  assert(typeof result.profile.name === 'string', 'Name should be string')
  assert(Array.isArray(result.directors), 'directors should be an array')
  assert(result.directors.length > 0, 'Should have directors')
})

Deno.test('CompanyModule - getRelistingData', async () => {
  const module = new CompanyModule()
  const result = await module.getRelistingData(5, 0)
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result.data), 'data should be an array')
})

Deno.test('CompanyModule - getSecuritiesStock', async () => {
  const module = new CompanyModule()
  const result = await module.getSecuritiesStock(0, 5)
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result.data), 'data should be an array')
})

Deno.test('CompanyModule - getSuspendData', async () => {
  const module = new CompanyModule()
  const result = await module.getSuspendData(5)
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result.results), 'results should be an array')
})
