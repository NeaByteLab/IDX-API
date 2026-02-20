/**
 * Additional listing shares data.
 * @description Record of increased share supply events.
 */
export interface AdditionalListing {
  /** Company ticker code */
  code: string
  /** Issuer company name */
  name: string
  /** Amount of newly listed shares */
  shares: number
  /** Mechanism or reason for listing */
  type: string
  /** Additional shares listing start date */
  startDate: string
  /** Additional shares listing last date */
  lastDate: string
}

/**
 * Combined announcement data record.
 * @description Links details and attachments for announcements.
 */
export interface Announcement {
  /** Main announcement details */
  details: AnnouncementDetail
  /** List of file attachments */
  attachments: AnnouncementAttachment[]
}

/**
 * Announcement file attachment metadata.
 * @description Defines fields for linked announcement files.
 */
export interface AnnouncementAttachment {
  /** PDF filename */
  filename: string
  /** Full URL to the file */
  url: string
  /** Original filename */
  originalName: string
  /** Whether this is an attachment */
  isAttachment: boolean
}

/**
 * Detailed announcement record information.
 * @description Defines metadata for single company announcements.
 */
export interface AnnouncementDetail {
  /** Unique ID string */
  id: string
  /** Announcement number */
  number: string
  /** Announcement date */
  date: string
  /** Announcement title */
  title: string
  /** Announcement type */
  type: string
  /** Company ticker code */
  companyCode: string
  /** Created date */
  createdDate: string
  /** Form ID */
  formId: string
  /** Subject of announcement */
  subject: string
  /** Stock effect flag */
  isStock: boolean
  /** Bond effect flag */
  isBond: boolean
}

/**
 * Company announcement response wrapper.
 * @description Contains announcements and total result count.
 */
export interface AnnouncementResponse {
  /** List of announcements */
  data: Announcement[]
  /** Total records */
  recordsTotal: number
}

/**
 * Company detailed profile response.
 * @description Detailed metadata for a listed company.
 */
export interface CompanyDetailResponse {
  /** Basic profile information */
  profile: {
    address: string
    bae: string
    industry: string
    subIndustri: string
    email: string
    fax: string
    businessActivity: string
    code: string
    name: string
    phone: string
    website: string
    npwp: string
    history: string
    listingDate: string
    board: string
    sector: string
    subSector: string
    status: string
  }
  /** Company secretary information */
  secretary: {
    name: string
    email: string
    phone: string
  }[]
  /** Board of directors */
  directors: {
    name: string
    position: string
  }[]
  /** Board of commissioners */
  commissioners: {
    name: string
    position: string
  }[]
  /** Committee members */
  committees: {
    name: string
    position: string
    type: string
  }[]
  /** Major shareholders */
  shareholders: {
    name: string
    count: number
    percentage: number
  }[]
  /** Subsidiaries */
  subsidiaries: {
    name: string
    type: string
    location: string
    status: string
    percentage: number
    totalAssets: number
    unit: string
  }[]
}

/**
 * Generic company paginated response wrapper.
 * @description Standard structure for paginated listing and corporate actions data.
 */
export interface CompanyPaginatedResponse<T> {
  /** Data payload */
  data: T[]
  /** Total matched records */
  recordsTotal?: number
}

/**
 * Company profile data.
 * @description Defines fields for basic company identification.
 */
export interface CompanyProfile {
  /** Company ticker code */
  code: string
  /** Company full name */
  name: string
  /** Listing date */
  listingDate: string
}

/**
 * Company profile response wrapper.
 * @description Contains list of company profiles and total count.
 */
export interface CompanyProfileResponse {
  /** List of company profiles */
  data: CompanyProfile[]
  /** Total records */
  recordsTotal: number
}

/**
 * Delisted stock record.
 * @description Companies removed from active trading.
 */
export interface Delisting {
  /** Ticker code previously used */
  code: string
  /** Issuer company name */
  name: string
  /** Total listed shares at delisting */
  listedShares: number
  /** Final market capitalization */
  marketCap: number
  /** Final regular market price */
  regularPrice: number
  /** Last active trading date */
  lastDate: string
  /** Initial listing date */
  listingDate: string
  /** Delisting effect date */
  delistingDate: string
}

/**
 * Company dividend announcement event.
 * @description Detailed dividend distribution schedule.
 */
export interface DividendAnnouncement {
  /** Company ticker code */
  code: string
  /** Company name */
  name: string
  /** Distributed cash dividend per share */
  cashDividend: number
  /** Cum-dividend date */
  cumDividend: string
  /** Ex-dividend date */
  exDividend: string
  /** Recording date */
  recordDate: string
  /** Official payment date */
  paymentDate: string
}

/**
 * Financial report file metadata.
 * @description Detailed metadata for linked report files.
 */
export interface FinancialAttachment {
  /** Unique file identifier */
  id: string
  /** Display file name */
  name: string
  /** Resource file path */
  path: string
  /** File size in bytes */
  size: number
  /** File extension type */
  type: string
  /** Last modification timestamp */
  modifiedAt: string
}

/**
 * Detailed financial report result.
 * @description Detailed financial reporting records for companies.
 */
export interface FinancialReport {
  /** Company ticker code */
  code: string
  /** Issuer company name */
  name: string
  /** Fiscal year */
  year: number
  /** Reporting period (TW1, TW2, etc) */
  period: string
  /** List of report attachments */
  attachments: FinancialAttachment[]
}

/**
 * Company financial ratios structure.
 * @description Key financial indicators and performance metrics.
 */
export interface FinancialRatio {
  /** Company ticker code */
  code: string
  /** Company full name */
  name: string
  /** Broad sector classification */
  sector: string
  /** Specialized sub-sector */
  subSector: string
  /** Detailed industry classification */
  industry: string
  /** Specific sub-industry classification */
  subIndustry: string
  /** Financial statement date */
  period: string
  /** Total assets */
  assets: number
  /** Total liabilities */
  liabilities: number
  /** Total equity */
  equity: number
  /** Total sales/revenue */
  sales: number
  /** Earnings before tax */
  ebt: number
  /** Period profit */
  profit: number
  /** Earnings per share */
  eps: number
  /** Book value */
  bookValue: number
  /** Price-to-earnings ratio */
  per: number
  /** Price-to-book value ratio */
  pbv: number
  /** Debt-to-equity ratio */
  der: number
  /** Return on assets */
  roa: number
  /** Return on equity */
  roe: number
  /** Net profit margin */
  npm: number
}

/**
 * Issued share history record.
 * @description Detailed record of company share issuance events.
 */
export interface IssuedHistory {
  /** Record identifier */
  id: number
  /** Company ticker code */
  code: string
  /** Action date */
  date: string
  /** Action type classification */
  type: string
  /** Shares volume change */
  shares: number
  /** Total shares after action */
  totalShares: number
}

/**
 * New listing event data (IPO).
 * @description Initial public offering metadata.
 */
export interface NewListing {
  /** Scheduled ticker code */
  code: string
  /** Issuer company name */
  name: string
  /** Pre-listed shares */
  listedShares: number
  /** Number of offered shares */
  offeringShares: number
  /** Official offering price */
  offeringPrice: number
  /** Total funds raised */
  fundRaised: number
  /** First trading day */
  listingDate: string
}

/**
 * Simplified company announcement record.
 * @description Individual records for company profile updates.
 */
export interface ProfileAnnouncement {
  /** Announcement number */
  number: string
  /** Announcement timestamp */
  date: string
  /** Announcement title */
  title: string
  /** List of file attachments */
  attachments: AnnouncementAttachment[]
}

/**
 * Company relisting activity data.
 * @description Defines fields for relisting event records.
 */
export interface RelistingData {
  /** Company ticker code */
  code: string
  /** Company full name */
  name: string
  /** Relisting date */
  listingDate: string
}

/**
 * Company relisting response wrapper.
 * @description Contains list of relisted company activities.
 */
export interface RelistingResponse {
  /** List of relisted companies */
  data: RelistingData[]
  /** Total records */
  recordsTotal: number
}

/**
 * Right offering event data.
 * @description Information regarding shares subscription rights.
 */
export interface RightOffering {
  /** Company ticker code */
  code: string
  /** Issuer company name */
  name: string
  /** Rights execution ratio */
  ratio: string
  /** Target exercise price */
  exercisePrice: number
  /** Target funds to be generated */
  fundRaised: number
  /** Ex-rights date */
  exerciseDate: string
  /** Cutoff recording date */
  recordingDate: string
  /** Rights trading window */
  tradingPeriod: string
}

/**
 * Securities stock response wrapper.
 * @description Contains list of stocks and pagination metadata.
 */
export interface SecuritiesStockResponse {
  /** List of security stocks */
  data: SecurityStock[]
  /** Total records in database */
  recordsTotal: number
  /** Number of records after filtering */
  recordsFiltered: number
}

/**
 * Listed security stock data.
 * @description Defines fields for company listing information.
 */
export interface SecurityStock {
  /** Script ticker code */
  code: string
  /** Full company name */
  name: string
  /** Total shares listed */
  shares: number
  /** Board category */
  listingBoard: string
  /** Initial listing date */
  listingDate: string
}

/**
 * Stock screener analytical metric response.
 * @description Detailed stock profile metrics data.
 */
export interface StockScreenerResponse {
  /** List of screened stocks */
  results: StockScreenerResult[]
}

/**
 * Stock screener analytical metric result.
 * @description Detailed stock profile metrics data.
 */
export interface StockScreenerResult {
  /** Stock ticker code */
  code: string
  /** Company name */
  name: string
  /** Sub-industry code */
  subIndustryCode: string
  /** Broad sector classification */
  sector: string
  /** Specialized sub-sector */
  subSector: string
  /** Detailed industry classification */
  industry: string
  /** Specific sub-industry classification */
  subIndustry: string
  /** Total market capitalization */
  marketCapital: number
  /** Total revenue */
  totalRevenue: number
  /** Net profit margin */
  npm: number
  /** Price-to-earnings ratio */
  per: number
  /** Price-to-book value ratio */
  pbv: number
  /** Return on assets */
  roa: number
  /** Return on equity */
  roe: number
  /** Debt-to-equity ratio */
  der: number
  /** 4 weeks price changes */
  week4: number
  /** 13 weeks price changes */
  week13: number
  /** 26 weeks price changes */
  week26: number
  /** 52 weeks price changes */
  week52: number
  /** Year to date price changes */
  ytd: number
  /** Month to date price changes */
  mtd: number
  /** Unusual Market Activity date */
  umaDate: string | null
  /** Special notation/remark */
  notation: string | null
  /** Stock trading status */
  status: string | null
  /** Recent corporate action */
  corpAction: string | null
  /** Corporate action effective date */
  corpActionDate: string | null
}

/**
 * Stock split event data.
 * @description Record of approved stock splits/reverse-splits.
 */
export interface StockSplit {
  /** Company ticker code */
  code: string
  /** Issuer company name */
  name: string
  /** Split or reverse split classification */
  type: string
  /** Execution ratio */
  ratio: string
  /** Old nominal value */
  oldNominal: number
  /** New nominal value */
  newNominal: number
  /** Additional shares from split */
  additionalShares: number
  /** Total shares after split */
  listedShares: number
  /** New shares listing date */
  listingDate: string
}

/**
 * Security suspension event data.
 * @description Defines fields for trading suspension records.
 */
export interface SuspendEvent {
  /** Security ticker code */
  code: string
  /** Suspension title/description */
  title: string
  /** Event timestamp */
  date: string
  /** Type of information (Suspend/Unsuspend) */
  type: string
  /** Link to announcement PDF */
  downloadUrl: string
}

/**
 * Stock suspension response wrapper.
 * @description Contains list of recent suspension events.
 */
export interface SuspendResponse {
  /** List of suspension events */
  results: SuspendEvent[]
}
