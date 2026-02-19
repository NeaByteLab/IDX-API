/// <reference lib="deno.unstable" />
import { syncBrokerSummary } from '@app/Backend/Cron/BrokerSummary.ts'
import { syncStockSummary } from '@app/Backend/Cron/StockSummary.ts'
import { syncTradeSummary } from '@app/Backend/Cron/TradeSummary.ts'

/**
 * Cron job definition.
 * @description Hourly task to synchronize daily brokerage summary data.
 */
Deno.cron('Hourly Job', '0 * * * *', async () => {
  const dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  await syncBrokerSummary(dateToday)
  await syncTradeSummary()
  await syncStockSummary(dateToday)
})
