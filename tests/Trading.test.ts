import { assert } from '@std/assert'
import TradingModule from '@app/Trading/index.ts'

Deno.test('TradingModule - getBondSummary (Real API)', async () => {
  const trading = new TradingModule()
  const result = await trading.getBondSummary()
  if (result !== null && result.length > 0) {
    assert(Array.isArray(result))
    const first = result[0]
    if (first) {
      assert(typeof first.description === 'string')
      assert(typeof first.volume === 'number')
    }
  }
})

Deno.test('TradingModule - getBrokerSummary (Invalid Date)', async () => {
  const trading = new TradingModule()
  const result = await trading.getBrokerSummary('99999999')
  assert(result === null || result.data.length === 0)
})

Deno.test('TradingModule - getBrokerSummary (Pagination: Length & Offset)', async () => {
  const trading = new TradingModule()
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const page1 = await trading.getBrokerSummary(today, 0, 5)
  const page2 = await trading.getBrokerSummary(today, 5, 5)
  if (page1 !== null && page1.data.length > 0) {
    assert(page1.data.length <= 5)
    if (page2 !== null && page2.data.length > 0) {
      assert(page2.data.length <= 5)
      assert(page1.data[0]?.brokerCode !== page2.data[0]?.brokerCode)
    }
  }
})

Deno.test('TradingModule - getMarginSummary (Pagination)', async () => {
  const trading = new TradingModule()
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const result = await trading.getMarginSummary(today, 0, 10)
  if (result !== null && result.data.length > 0) {
    assert(Array.isArray(result.data))
    assert(result.data.length <= 10)
    const first = result.data[0]
    if (first) {
      assert(first.code !== undefined)
    }
  }
})

Deno.test('TradingModule - getStockSummary (Pagination)', async () => {
  const trading = new TradingModule()
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const result = await trading.getStockSummary(today, 0, 10)
  if (result !== null && result.data.length > 0) {
    assert(Array.isArray(result.data))
    assert(result.data.length <= 10)
    const first = result.data[0]
    if (first) {
      assert(first.code !== undefined)
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
      assert(typeof first.description === 'string')
      assert(typeof first.value === 'number')
      assert(typeof first.date === 'string')
    }
  }
})
