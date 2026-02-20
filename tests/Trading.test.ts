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

Deno.test('TradingModule - getDomesticTradingSummary', async () => {
  const trading = new TradingModule()
  const result = await trading.getDomesticTradingSummary(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result))
  }
})

Deno.test('TradingModule - getForeignTradingSummary', async () => {
  const trading = new TradingModule()
  const result = await trading.getForeignTradingSummary(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result))
  }
})

Deno.test('TradingModule - getIndexSummary (Invalid Date)', async () => {
  const trading = new TradingModule()
  const result = await trading.getIndexSummary('00000000')
  assert(result === null || result.data.length === 0)
})

Deno.test('TradingModule - getIndexSummary (Pagination)', async () => {
  const trading = new TradingModule()
  const result = await trading.getIndexSummary(testDate, 0, 5)
  if (result !== null && result.data.length > 0) {
    assert(result.data.length <= 5)
    const first = result.data[0]
    if (first) {
      assert(first.code !== undefined)
      assert(typeof first.price.close === 'number')
      assert(typeof first.marketCap === 'number')
    }
  }
})

Deno.test('TradingModule - getIndustryTradingSummary', async () => {
  const trading = new TradingModule()
  const result = await trading.getIndustryTradingSummary(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result))
  }
})

Deno.test('TradingModule - getMostActiveByFrequency', async () => {
  const trading = new TradingModule()
  const result = await trading.getMostActiveByFrequency(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result.data))
  }
})

Deno.test('TradingModule - getMostActiveByValue', async () => {
  const trading = new TradingModule()
  const result = await trading.getMostActiveByValue(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result.data))
  }
})

Deno.test('TradingModule - getMostActiveByVolume', async () => {
  const trading = new TradingModule()
  const result = await trading.getMostActiveByVolume(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result.data))
  }
})

Deno.test('TradingModule - getStockSummary (Invalid Date)', async () => {
  const trading = new TradingModule()
  const result = await trading.getStockSummary('00000000')
  assert(result === null || result.length === 0)
})

Deno.test('TradingModule - getStockSummary', async () => {
  const trading = new TradingModule()
  const result = await trading.getStockSummary(testDate)
  if (result !== null && result.length > 0) {
    assert(Array.isArray(result))
    const first = result[0]
    if (first) {
      assert(first.code !== undefined)
      assert(typeof first.price.close === 'number')
      assert(first.date instanceof Date)
    }
  }
})

Deno.test('TradingModule - getTradingInfoDaily', async () => {
  const trading = new TradingModule()
  const result = await trading.getTradingInfoDaily('BBCA')
  assert(result !== null, 'Result should not be null')
  assert(result.code === 'BBCA', 'Code should match')
})

Deno.test('TradingModule - getTradingInfoSS', async () => {
  const trading = new TradingModule()
  const result = await trading.getTradingInfoSS('BBCA')
  assert(result !== null, 'Result should not be null')
  assert(Array.isArray(result), 'Result should be an array')
})

Deno.test('TradingModule - getTopGainers', async () => {
  const trading = new TradingModule()
  const result = await trading.getTopGainers(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result))
  }
})

Deno.test('TradingModule - getTopLosers', async () => {
  const trading = new TradingModule()
  const result = await trading.getTopLosers(2024, 1)
  if (result !== null) {
    assert(Array.isArray(result))
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
      assert(typeof first.volume === 'number')
      assert(typeof first.value === 'number')
      assert(typeof first.frequency === 'number')
      assert(typeof first.date === 'string')
    }
  }
})
