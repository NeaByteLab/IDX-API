import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Stock screener schema.
 * @description Stores analytical metrics for listed stocks.
 */
export const stockScreener = sqliteTable('stock_screener', {
  /** Company ticker identifier */
  code: text('code').primaryKey(),
  /** Full issuer name */
  name: text('name'),
  /** Industry classification */
  industry: text('industry'),
  /** Stock market sector */
  sector: text('sector'),
  /** Specialized sub-sector */
  subSector: text('sub_sector'),
  /** Specific sub-industry classification */
  subIndustry: text('sub_industry'),
  /** Sub-industry code */
  subIndustryCode: text('sub_industry_code'),
  /** Total market capitalization */
  marketCapital: real('market_capital'),
  /** Total revenue */
  totalRevenue: real('total_revenue'),
  /** Net profit margin */
  npm: real('npm'),
  /** Price-to-earnings ratio */
  per: real('per'),
  /** Price-to-book value ratio */
  pbv: real('pbv'),
  /** Return on assets */
  roa: real('roa'),
  /** Return on equity */
  roe: real('roe'),
  /** Debt-to-equity ratio */
  der: real('der'),
  /** 4 weeks price changes */
  week4: real('week4'),
  /** 13 weeks price changes */
  week13: real('week13'),
  /** 26 weeks price changes */
  week26: real('week26'),
  /** 52 weeks price changes */
  week52: real('week52'),
  /** Year to date price changes */
  ytd: real('ytd'),
  /** Month to date price changes */
  mtd: real('mtd'),
  /** Unusual Market Activity date */
  umaDate: text('uma_date'),
  /** Special notation/remark */
  notation: text('notation'),
  /** Stock trading status */
  status: text('status'),
  /** Recent corporate action */
  corpAction: text('corp_action'),
  /** Corporate action effective date */
  corpActionDate: text('corp_action_date')
})
