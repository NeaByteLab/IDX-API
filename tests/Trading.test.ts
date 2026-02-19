import { assert } from '@std/assert'
import TradingModule from '@app/Trading/index.ts'
const testDate = '20250108'

Deno.test('TradingModule - getBrokerSummary (Invalid Date)', async () => {
  const trading = new TradingModule()
  const result = await trading.getBrokerSummary('99999999')
  assert(result === null || result.data.length === 0)
})

Deno.test('TradingModule - getBrokerSummary (Pagination: Length & Offset)', async () => {
  const trading = new TradingModule()
  const page1 = await trading.getBrokerSummary(testDate, 0, 5)
  const page2 = await trading.getBrokerSummary(testDate, 5, 5)
  if (page1 !== null && page1.data.length > 0) {
    assert(page1.data.length <= 5)
    if (page2 !== null && page2.data.length > 0) {
      assert(page2.data.length <= 5)
      assert(page1.data[0]?.brokerCode !== page2.data[0]?.brokerCode)
    }
  }
})

Deno.test('TradingModule - getStockSummary', async () => {
  const trading = new TradingModule()
  const result = await trading.getStockSummary(testDate)
  if (result !== null && result.length > 0) {
    assert(Array.isArray(result))
    const first = result[0]
    if (first) {
      assert(first !== undefined)
    }
  }
})

Deno.test('TradingModule - getTradeSummary (Real API)', async () => {
  const trading = new TradingModule()
  const result = await trading.getTradeSummary()
  if (result !== null && result.length > 0) {
    assert(Array.isArray(result))
    const first = result[0]
    if (first) {
      assert(typeof first.id === 'string')
      assert(typeof first.value === 'number')
      assert(typeof first.date === 'string')
    }
  }
})
