/// <reference lib="deno.unstable" />
import { syncBrokerParticipant } from '@app/Backend/Cron/BrokerParticipant.ts'
import { syncBrokerSummary } from '@app/Backend/Cron/BrokerSummary.ts'
import { syncCompanyAnnouncement } from '@app/Backend/Cron/CompanyAnnouncement.ts'
import { syncCompanyProfile } from '@app/Backend/Cron/CompanyProfile.ts'
import { syncDealerParticipant } from '@app/Backend/Cron/DealerParticipant.ts'
import { syncIndexSummary } from '@app/Backend/Cron/IndexSummary.ts'
import { syncProfileParticipant } from '@app/Backend/Cron/ProfileParticipant.ts'
import { syncStockSummary } from '@app/Backend/Cron/StockSummary.ts'
import { syncTradeSummary } from '@app/Backend/Cron/TradeSummary.ts'

/**
 * Hourly Cron Job.
 * @description Sequentially executes all registered sync jobs.
 */
Deno.cron('Hourly Job', '0 * * * *', async () => {
  const dateToday = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  await syncBrokerParticipant()
  await syncBrokerSummary(dateToday)
  await syncCompanyAnnouncement()
  await syncCompanyProfile()
  await syncDealerParticipant()
  await syncIndexSummary(dateToday)
  await syncProfileParticipant()
  await syncStockSummary(dateToday)
  await syncTradeSummary()
})

/**
 * Cron sync functions.
 * @description Centralized export for all cron job synchronization functions.
 */
export * from '@app/Backend/Cron/BrokerParticipant.ts'
export * from '@app/Backend/Cron/BrokerSummary.ts'
export * from '@app/Backend/Cron/CompanyAnnouncement.ts'
export * from '@app/Backend/Cron/CompanyProfile.ts'
export * from '@app/Backend/Cron/DealerParticipant.ts'
export * from '@app/Backend/Cron/IndexSummary.ts'
export * from '@app/Backend/Cron/ProfileParticipant.ts'
export * from '@app/Backend/Cron/StockSummary.ts'
export * from '@app/Backend/Cron/TradeSummary.ts'
