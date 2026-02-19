/**
 * Exchange member broker profile.
 * @description Exchange member with trading license.
 */
export interface BrokerProfile {
  /** Broker code (e.g. YP, CC) */
  code: string
  /** Broker name */
  name: string
  /** License type (e.g. Perantara Pedagang Efek) */
  license: string
}

/**
 * Paginated API response wrapper.
 * @description Generic paginated API response format.
 */
export interface PaginatedResponse<T> {
  /** Draw counter (for DataTables) */
  draw: number
  /** Total records in database */
  recordsTotal: number
  /** Records after filtering */
  recordsFiltered: number
  /** Response data array */
  data: T[]
}

/**
 * Market participant profile data.
 * @description General participant including banks and institutions.
 */
export interface ParticipantProfile {
  /** Participant code */
  code: string
  /** Participant name */
  name: string
  /** License type */
  license: string
  /** Primary dealer indicator flag */
  isPrimary: boolean
}

/**
 * Special primary dealer profile.
 * @description Participant recognized as Primary Dealer.
 */
export interface PrimaryDealerProfile {
  /** Dealer code */
  code: string
  /** Dealer name */
  name: string
  /** License type */
  license: string
  /** Is Primary Dealer flag */
  isPrimary: boolean
}
