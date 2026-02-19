/// <reference lib="deno.unstable" />
import * as cron from '@app/Backend/Sync/index.ts'

/**
 * Hourly cron job.
 * @description Executes registered sync jobs sequentially.
 */
Deno.cron('Hourly Job', '0 * * * *', async () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const dateToday = now.toISOString().slice(0, 10).replace(/-/g, '')
  const dateISO = now.toISOString().slice(0, 10)
  await cron.syncActiveFrequency(year, month, dateISO)
  await cron.syncActiveValue(year, month, dateISO)
  await cron.syncActiveVolume(year, month, dateISO)
  await cron.syncAdditionalListing(year, month)
  await cron.syncBrokerParticipant()
  await cron.syncBrokerSummary(dateToday)
  await cron.syncCompanyAnnouncement()
  await cron.syncCompanyDelisting(year, month)
  await cron.syncCompanyDividend(year, month)
  await cron.syncCompanyProfile()
  await cron.syncCompanyRelisting()
  await cron.syncCompanySuspend()
  await cron.syncDailyIndex(year, month)
  await cron.syncDealerParticipant()
  await cron.syncDomesticTrading(year, month)
  await cron.syncFinancialRatio(year, month)
  await cron.syncForeignTrading(year, month)
  await cron.syncIndexList()
  await cron.syncIndexSummary(dateToday)
  await cron.syncIndustryTrading(year, month)
  await cron.syncMarketCalendar()
  await cron.syncNewListing(year, month)
  await cron.syncProfileParticipant()
  await cron.syncRightOffering(year, month)
  await cron.syncSectoralMovement(year, month)
  await cron.syncSecurityStock()
  await cron.syncStockSplit(year, month)
  await cron.syncStockSummary(dateToday)
  await cron.syncTopGainer(year, month)
  await cron.syncTopLoser(year, month)
  await cron.syncTradeSummary()
})
