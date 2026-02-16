import type * as Types from '@app/Company/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Company and securities module.
 * @description Handles listed companies and suspension data.
 */
export default class CompanyModule extends BaseClient {
  /**
   * Fetch news announcements.
   * @description Returns latest company announcements.
   * @param pageSize - Record count per page
   * @param indexFrom - Pagination start index
   * @param language - Language code (id-id)
   * @returns Company announcement response data
   */
  async getAnnouncements(
    pageSize = 9999,
    indexFrom = 0,
    language = 'id-id'
  ): Promise<Types.AnnouncementResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/ListedCompany/GetAnnouncement?pageSize=${pageSize}&indexFrom=${indexFrom}&language=${language}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Replies) {
        return null
      }
      return {
        data: rawResponse.Replies.map(
          (item: {
            pengumuman: {
              Id2: string
              NoPengumuman: string
              TglPengumuman: string
              JudulPengumuman: string
              JenisPengumuman: string
              Kode_Emiten: string
              CreatedDate: string
              Form_Id: string
              PerihalPengumuman: string
              EfekEmiten_Saham: boolean
              EfekEmiten_Obligasi: boolean
            }
            attachments: {
              PDFFilename: string
              FullSavePath: string
              OriginalFilename: string
              IsAttachment: boolean
            }[]
          }) => ({
            details: {
              id: item.pengumuman.Id2,
              number: item.pengumuman.NoPengumuman,
              date: item.pengumuman.TglPengumuman,
              title: item.pengumuman.JudulPengumuman,
              type: item.pengumuman.JenisPengumuman,
              companyCode: item.pengumuman.Kode_Emiten.trim(),
              createdDate: item.pengumuman.CreatedDate,
              formId: item.pengumuman.Form_Id,
              subject: item.pengumuman.PerihalPengumuman,
              isStock: item.pengumuman.EfekEmiten_Saham,
              isBond: item.pengumuman.EfekEmiten_Obligasi
            },
            attachments: item.attachments.map((att) => ({
              filename: att.PDFFilename,
              url: att.FullSavePath,
              originalName: att.OriginalFilename,
              isAttachment: att.IsAttachment
            }))
          })
        ),
        recordsTotal: rawResponse.ResultCount
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch relisting data.
   * @description Returns companies that have been relisted.
   * @param pageSize - Record count per page
   * @param indexFrom - Pagination start index
   * @returns Relisting activity response data
   */
  async getRelistingData(pageSize = 9999, indexFrom = 0): Promise<Types.RelistingResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/Home/GetRelistingData?pageSize=${pageSize}&indexFrom=${indexFrom}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Activities) {
        return null
      }
      return {
        data: rawResponse.Activities.map(
          (item: { KodeEmiten: string; NamaEmiten: string; TanggalPencatatan: string }) => ({
            code: item.KodeEmiten,
            name: item.NamaEmiten,
            listingDate: item.TanggalPencatatan
          })
        ),
        recordsTotal: rawResponse.Activities.length
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch all listed security stocks.
   * @description Returns list of IDX listed companies.
   * @param start - Starting record index
   * @param length - Maximum record count
   * @param code - Optional ticker code filter
   * @param sector - Optional sector filter
   * @param board - Optional board category filter
   * @returns Comprehensive securities response data
   */
  async getSecuritiesStock(
    start = 0,
    length = 9999,
    code = '',
    sector = '',
    board = ''
  ): Promise<Types.SecuritiesStockResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/StockData/GetSecuritiesStock?start=${start}&length=${length}&code=${code}&sector=${sector}&board=${board}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.data) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            Code: string
            Name: string
            Shares: number
            ListingDate: string
            ListingBoard: string
          }) => ({
            code: item.Code,
            name: item.Name,
            shares: item.Shares,
            listingDate: item.ListingDate,
            listingBoard: item.ListingBoard
          })
        ),
        recordsTotal: rawResponse.recordsTotal,
        recordsFiltered: rawResponse.recordsFiltered
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch latest stock suspensions.
   * @description Returns list of recently suspended securities.
   * @param resultCount - Number of recent events
   * @returns Recent suspension response data
   */
  async getSuspendData(resultCount = 9999): Promise<Types.SuspendResponse | null> {
    await this.ensureSession()
    try {
      const url = `https://www.idx.co.id/primary/Home/GetSuspendData?resultCount=${resultCount}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Results) {
        return null
      }
      return {
        results: rawResponse.Results.map((item: { Judul: string }) => ({
          title: item.Judul
        }))
      }
    } catch {
      return null
    }
  }
}
