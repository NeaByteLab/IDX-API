import { assert } from '@std/assert'
import MarketModule from '@app/Market/index.ts'

Deno.test('MarketModule - getCalendar (Historical)', async () => {
  const market = new MarketModule()
  const result = await market.getCalendar('20240101')
  if (result !== null) {
    assert(Array.isArray(result.results))
    assert(result.resultCount >= 0)
  }
})

Deno.test('MarketModule - getCalendar (Invalid Date)', async () => {
  const market = new MarketModule()
  const result = await market.getCalendar('not-a-date')
  assert(result === null || result.results.length === 0)
})

Deno.test('MarketModule - getIndexChart (All Periods)', async () => {
  const market = new MarketModule()
  const periods = ['1D', '1W', '1M', '1Q', '1Y'] as const
  const fetchPromises = periods.map((period) => market.getIndexChart('COMPOSITE', period))
  const results = await Promise.all(fetchPromises)
  for (const result of results) {
    if (result !== null) {
      assert(result.indexCode === 'COMPOSITE')
      assert(Array.isArray(result.chartData))
    }
  }
})

Deno.test('MarketModule - getIndexChart (Invalid Code)', async () => {
  const market = new MarketModule()
  const result = await market.getIndexChart('INVALID_123')
  assert(result === null)
})

Deno.test('MarketModule - getIndexList (Real API)', async () => {
  const market = new MarketModule()
  const result = await market.getIndexList()
  if (result !== null) {
    assert(Array.isArray(result))
    if (result.length > 0) {
      const first = result[0]
      if (first) {
        assert(first.code !== undefined)
        assert(typeof first.current === 'string')
      }
    }
  }
})
