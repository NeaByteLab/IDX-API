import type * as Types from '@app/Company/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Company and securities module.
 * @description Handles listed companies and suspension data.
 */
export default class CompanyModule extends BaseClient {
  /**
   * Fetch company news announcements.
   * @description Returns filtered IDX announcements data.
   * @param companyCode - Company ticker filter
   * @param pageSize - Record count limit
   * @param indexFrom - Pagination start index
   * @param dateFrom - Start date YYYYMMDD
   * @param dateTo - End date YYYYMMDD
   * @param language - Language code (id/en)
   * @returns Announcement response data
   */
  async getAnnouncements(
    companyCode = '',
    pageSize = 9999,
    indexFrom = 0,
    dateFrom = '',
    dateTo = '',
    language = 'id'
  ): Promise<Types.AnnouncementResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/ListedCompany/GetAnnouncement?kodeEmiten=${companyCode}&indexFrom=${indexFrom}&pageSize=${pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}&lang=${language}`
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
   * Fetch company profiles.
   * @description Returns list of basic company profile information.
   * @param start - Starting record index
   * @param length - Maximum record count
   * @returns Company profile response data
   */
  async getCompanyProfiles(start = 0, length = 9999): Promise<Types.CompanyProfileResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/ListedCompany/GetCompanyProfiles?start=${start}&length=${length}`
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
          (item: { KodeEmiten: string; NamaEmiten: string; TanggalPencatatan: string }) => ({
            code: item.KodeEmiten,
            name: item.NamaEmiten,
            listingDate: item.TanggalPencatatan
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch detailed company profile.
   * @description Returns exhaustive metadata for a specific company ticker.
   * @param companyCode - Company ticker code (e.g., BBCA)
   * @param language - Language code (id-id)
   * @returns Detailed company profile response data
   */
  async getCompanyProfilesDetail(
    companyCode: string,
    language = 'id-id'
  ): Promise<Types.CompanyDetailResponse | null> {
    await this.ensureSession()
    try {
      const url =
        `https://www.idx.co.id/primary/ListedCompany/GetCompanyProfilesDetail?KodeEmiten=${companyCode}&language=${language}`
      const response = await fetch(url, {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      })
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Profiles || rawResponse.Profiles.length === 0) {
        return null
      }
      const profile = rawResponse.Profiles[0]
      return {
        profile: {
          address: profile.Alamat,
          bae: profile.BAE,
          industry: profile.Industri,
          subIndustri: profile.SubIndustri,
          email: profile.Email,
          fax: profile.Fax,
          businessActivity: profile.KegiatanUsahaUtama,
          code: profile.KodeEmiten,
          name: profile.NamaEmiten,
          phone: profile.Telepon,
          website: profile.Website,
          npwp: profile.NPWP,
          history: profile.SejarahPencatatan,
          listingDate: profile.TanggalPencatatan,
          board: profile.PapanPencatatan,
          sector: profile.Sektor,
          subSector: profile.SubSektor,
          status: profile.Status
        },
        secretary: (rawResponse.Sekretaris || []).map(
          (item: { Nama: string; Email: string; Telepon: string }) => ({
            name: item.Nama,
            email: item.Email,
            phone: item.Telepon
          })
        ),
        directors: (rawResponse.Direktur || []).map((item: { Nama: string; Jabatan: string }) => ({
          name: item.Nama,
          position: item.Jabatan
        })),
        commissioners: (rawResponse.Komisaris || []).map(
          (item: { Nama: string; Jabatan: string }) => ({
            name: item.Nama,
            position: item.Jabatan
          })
        ),
        committees: (rawResponse.Komite || []).map(
          (item: { Nama: string; Jabatan: string; JabatanLain: string }) => ({
            name: item.Nama,
            position: item.Jabatan,
            type: item.JabatanLain
          })
        ),
        shareholders: (rawResponse.PemegangSaham || []).map(
          (item: { Nama: string; Jumlah: number; Persentase: number }) => ({
            name: item.Nama,
            count: item.Jumlah,
            percentage: item.Persentase
          })
        ),
        subsidiaries: (rawResponse.AnakPerusahaan || []).map(
          (item: {
            Nama: string
            JenisUsaha: string
            Lokasi: string
            Status: string
            Persentase: number
            TotalAset: number
            Satuan: string
          }) => ({
            name: item.Nama,
            type: item.JenisUsaha,
            location: item.Lokasi,
            status: item.Status,
            percentage: item.Persentase,
            totalAssets: item.TotalAset,
            unit: item.Satuan
          })
        )
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
   * @returns Securities response data
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
