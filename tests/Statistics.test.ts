import { assert } from '@std/assert'
import StatisticModule from '@app/Statistics/index.ts'
import type { DigitalFeatures } from '@app/Statistics/Types.ts'

Deno.test('StatisticModule - discover (Multi-Feature Loop)', async () => {
  const stats = new StatisticModule()
  const sampleFeatures: DigitalFeatures[] = [
    {
      label: 'Composite Index',
      webUrl:
        'https://www.idx.co.id/id/data-pasar/laporan-statistik/digital-statistic/monthly/highlights/composite-stock-price-index',
      apiUrl:
        'https://www.idx.co.id/primary/page/id/data-pasar/laporan-statistik/digital-statistic/monthly/highlights/composite-stock-price-index?filter=eyJ5ZWFyIjoiMjAyNiIsIm1vbnRoIjoiMSIsInF1YXJ0ZXIiOjAsInR5cGUiOiJtb250aGx5In0%3D'
    },
    {
      label: 'Indices Highlight',
      webUrl:
        'https://www.idx.co.id/id/data-pasar/laporan-statistik/digital-statistic/monthly/highlights/idx-indices-highlight',
      apiUrl:
        'https://www.idx.co.id/primary/page/id/data-pasar/laporan-statistik/digital-statistic/monthly/highlights/idx-indices-highlight?filter=eyJ5ZWFyIjoiMjAyNiIsIm1vbnRoIjoiMSIsInF1YXJ0ZXIiOjAsInR5cGUiOiJtb250aGx5In0%3D'
    }
  ]
  const result = await stats.discover(sampleFeatures)
  assert(typeof result === 'string')
  assert(result.includes('| Composite Index |'))
  assert(result.includes('| Indices Highlight |'))
  assert(!result.includes('| Error |'))
  assert(result.includes('[JSON Link]'))
})

Deno.test('StatisticModule - saveOutput (I/O Verification)', async () => {
  const stats = new StatisticModule()
  const tempFile = 'tests/temp_test.md'
  const content = '# Test Content'
  try {
    await stats.saveOutput(content, tempFile)
    const saved = await Deno.readTextFile(tempFile)
    assert(saved === content)
  } finally {
    try {
      await Deno.remove(tempFile)
    } catch {
      void 0
    }
  }
})
