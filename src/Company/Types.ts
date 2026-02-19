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
 * @description Exhaustive metadata for a listed company.
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
 * Security suspension event data.
 * @description Defines fields for trading suspension records.
 */
export interface SuspendEvent {
  /** Suspension title/description */
  title: string
}

/**
 * Stock suspension response wrapper.
 * @description Contains list of recent suspension events.
 */
export interface SuspendResponse {
  /** List of suspension events */
  results: SuspendEvent[]
}
