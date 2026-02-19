/// <reference lib="deno.unstable" />
import { syncBrokerSummary } from '@app/Backend/Cron/BrokerSummary.ts'

/**
 * Cron job definition.
 * @description Hourly task to synchronize daily brokerage summary data.
 */
Deno.cron('BrokerSummary', '0 * * * *', async () => {
  const dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  await syncBrokerSummary(dateToday)
})
