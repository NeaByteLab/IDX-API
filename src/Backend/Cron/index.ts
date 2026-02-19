/// <reference lib="deno.unstable" />
import { syncBrokerParticipant } from '@app/Backend/Cron/BrokerParticipant.ts'
import { syncBrokerSummary } from '@app/Backend/Cron/BrokerSummary.ts'
import { syncDealerParticipant } from '@app/Backend/Cron/DealerParticipant.ts'
import { syncProfileParticipant } from '@app/Backend/Cron/ProfileParticipant.ts'
import { syncStockSummary } from '@app/Backend/Cron/StockSummary.ts'
import { syncTradeSummary } from '@app/Backend/Cron/TradeSummary.ts'

/**
 * Cron job definition.
 * @description Hourly task to synchronize daily brokerage summary data.
 */
Deno.cron('Hourly Job', '0 * * * *', async () => {
  const dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  await syncBrokerParticipant()
  await syncBrokerSummary(dateToday)
  await syncDealerParticipant()
  await syncProfileParticipant()
  await syncStockSummary(dateToday)
  await syncTradeSummary()
})
