import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Company financial ratios schema.
 * @description Performance indicators from financial reports.
 */
export const financialRatio = sqliteTable('financial_ratio', {
  /** Record identifier (code-period) */
  id: text('id').primaryKey(),
  /** Company ticker identifier */
  code: text('code').notNull(),
  /** Full issuer company name */
  name: text('name'),
  /** Sectoral classification */
  sector: text('sector'),
  /** Sub-sector classification */
  subSector: text('sub_sector'),
  /** Detailed industry category */
  industry: text('industry'),
  /** Specific sub-industry category */
  subIndustry: text('sub_industry'),
  /** Financial reporting date/period */
  period: integer('period').notNull(),
  /** Total asset value */
  assets: real('assets'),
  /** Total liability value */
  liabilities: real('liabilities'),
  /** Total shareholder equity */
  equity: real('equity'),
  /** Total sales or revenue */
  sales: real('sales'),
  /** Earnings before tax */
  ebt: real('ebt'),
  /** Net profit for period */
  profit: real('profit'),
  /** Earnings per share */
  eps: real('eps'),
  /** Share book value */
  bookValue: real('book_value'),
  /** Price to Earnings Ratio */
  per: real('per'),
  /** Price to Book Value Ratio */
  pbv: real('pbv'),
  /** Debt to Equity Ratio */
  der: real('der'),
  /** Return on Assets */
  roa: real('roa'),
  /** Return on Equity */
  roe: real('roe'),
  /** Net Profit Margin */
  npm: real('npm')
})
