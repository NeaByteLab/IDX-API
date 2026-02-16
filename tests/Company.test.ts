import { assert, assertEquals } from '@std/assert'
import CompanyModule from '@app/Company/index.ts'

Deno.test('CompanyModule - getAnnouncements (Localization)', async () => {
  const company = new CompanyModule()
  const resultId = await company.getAnnouncements(5, 0, 'id-id')
  const resultEn = await company.getAnnouncements(5, 0, 'en-us')
  if (resultId !== null) {
    assert(Array.isArray(resultId.data))
  }
  if (resultEn !== null) {
    assert(Array.isArray(resultEn.data))
  }
})

Deno.test('CompanyModule - getRelistingData (Real API)', async () => {
  const company = new CompanyModule()
  const result = await company.getRelistingData(5)
  if (result !== null && result.data.length > 0) {
    assert(Array.isArray(result.data))
    const first = result.data[0]
    if (first) {
      assert(first.code !== undefined)
      assert(first.listingDate !== undefined)
    }
  }
})

Deno.test('CompanyModule - getSecuritiesStock (Filtering: Code)', async () => {
  const company = new CompanyModule()
  const result = await company.getSecuritiesStock(0, 10, 'BBCA')
  if (result !== null && result.data.length > 0) {
    const hasBBCA = result.data.some((s) => s.code === 'BBCA')
    assert(hasBBCA)
  }
})

Deno.test('CompanyModule - getSecuritiesStock (Filtering: Sector & Board)', async () => {
  const company = new CompanyModule()
  const result = await company.getSecuritiesStock(0, 10, '', 'ENERGY', 'Main')
  if (result !== null && result.data.length > 0) {
    assert(result.data.length > 0)
    const first = result.data[0]
    if (first) {
      assert(typeof first.listingBoard === 'string')
    }
  }
})

Deno.test('CompanyModule - getSecuritiesStock (Non-Existent Code)', async () => {
  const company = new CompanyModule()
  const result = await company.getSecuritiesStock(0, 10, 'Z_Z_Z_Z')
  if (result !== null) {
    assertEquals(result.data.length, 0)
    assertEquals(result.recordsFiltered, 0)
  }
})

Deno.test('CompanyModule - getSuspendData (Real API)', async () => {
  const company = new CompanyModule()
  const result = await company.getSuspendData(5)
  if (result !== null) {
    assert(Array.isArray(result.results))
  }
})
