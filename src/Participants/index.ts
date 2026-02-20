import BaseClient from '@app/Client.ts'
import type * as Types from '@app/Participants/Types.ts'

/**
 * Exchange participants data module.
 * @description Handles Brokers, Participants, and Primary Dealers.
 */
export default class ParticipantsModule extends BaseClient {
  /**
   * Search exchange members.
   * @description Returns list of registered exchange brokers.
   * @param start - Pagination start index
   * @param length - Maximum record count
   * @returns List of broker profiles
   */
  async getBrokerSearch(start = 0, length = 9999): Promise<Types.BrokerProfile[] | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ExchangeMember/GetBrokerSearch?start=${start}&length=${length}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      const pagedData = rawResponse.data.slice(0, length)
      return pagedData.map((item: { Code: string; Name: string; License: string }) => ({
        code: item.Code,
        name: item.Name,
        license: item.License
      }))
    } catch {
      return null
    }
  }

  /**
   * Search market participants.
   * @description Returns paginated list of market participants.
   * @param start - Pagination start index
   * @param length - Maximum record count
   * @param codeOrName - Filter by code or name
   * @param license - Filter by license type
   * @returns Paginated participant profiles
   */
  async getParticipantSearch(
    start = 0,
    length = 9999,
    codeOrName = '',
    license = ''
  ): Promise<Types.PaginatedResponse<Types.ParticipantProfile> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ExchangeMember/GetParticipantSearch?start=${start}&length=${length}&codeName=${codeOrName}&license=${license}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        draw: rawResponse.draw,
        recordsTotal: rawResponse.recordsTotal,
        recordsFiltered: rawResponse.recordsFiltered,
        data: rawResponse.data.map(
          (item: {
            Code: string
            Name: string
            License: string
            IsPd: number
            Links: { Rel: string; Href: string; Method: string }[]
          }) => ({
            code: item.Code,
            name: item.Name,
            license: item.License,
            isPrimary: item.IsPd === 1
          })
        )
      }
    } catch {
      return null
    }
  }

  /**
   * Search primary dealers.
   * @description Returns paginated list of primary dealers.
   * @param start - Pagination start index
   * @param length - Maximum record count
   * @param codeOrName - Filter by code or name
   * @param license - Filter by license type
   * @returns Paginated primary dealer profiles
   */
  async getPrimaryDealerSearch(
    start = 0,
    length = 9999,
    codeOrName = '',
    license = ''
  ): Promise<Types.PaginatedResponse<Types.PrimaryDealerProfile> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ExchangeMember/GetPrimaryDealerSearch?start=${start}&length=${length}&codeName=${codeOrName}&license=${license}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        draw: rawResponse.draw,
        recordsTotal: rawResponse.recordsTotal,
        recordsFiltered: rawResponse.recordsFiltered,
        data: rawResponse.data.map(
          (item: {
            Code: string
            Name: string
            License: string
            IsPd: number
            Links: { Rel: string; Href: string; Method: string }[]
          }) => ({
            code: item.Code,
            name: item.Name,
            license: item.License,
            isPrimary: item.IsPd === 1
          })
        )
      }
    } catch {
      return null
    }
  }
}
