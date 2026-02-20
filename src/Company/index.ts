import BaseClient from '@app/Client.ts'
import type * as Types from '@app/Company/Types.ts'

/**
 * Company and securities module.
 * @description Handles listed companies and suspension data.
 */
export default class CompanyModule extends BaseClient {
  /**
   * Fetch additional listings.
   * @description Returns paginated list of newly added shares listings.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated additional listings response
   */
  async getAdditionalListings(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.AdditionalListing> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_LISTING&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            issuerName: string
            NumOfShares: number
            Type: string
            StartDate: string
            LastDate: string
          }) => ({
            code: item.code,
            name: item.issuerName,
            shares: item.NumOfShares,
            type: item.Type,
            startDate: item.StartDate,
            lastDate: item.LastDate
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ListedCompany/GetAnnouncement?kodeEmiten=${companyCode}&indexFrom=${indexFrom}&pageSize=${pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}&lang=${language}`
      )
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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ListedCompany/GetCompanyProfiles?start=${start}&length=${length}`
      )
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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/ListedCompany/GetCompanyProfilesDetail?KodeEmiten=${companyCode}&language=${language}`
      )
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
   * Fetch stock delistings.
   * @description Returns paginated list of delisted stocks.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated delisting events response
   */
  async getDelistings(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.Delisting> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_DELISTING&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            issuerName: string
            ListedShares: number
            MCap: number
            RegPrice: number
            LastDate: string
            ListingDate: string
            DeListingDate: string
          }) => ({
            code: item.code,
            name: item.issuerName,
            listedShares: item.ListedShares,
            marketCap: item.MCap,
            regularPrice: item.RegPrice,
            lastDate: item.LastDate,
            listingDate: item.ListingDate,
            delistingDate: item.DeListingDate
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch dividend announcements.
   * @description Returns paginated list of dividend events.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated dividend announcements response
   */
  async getDividendAnnouncements(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.DividendAnnouncement> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_DIVIDEND&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            name: string
            cashDividend: number
            cumDividend: string
            exDividend: string
            recordDate: string
            paymentDate: string
          }) => ({
            code: item.code,
            name: item.name,
            cashDividend: item.cashDividend,
            cumDividend: item.cumDividend,
            exDividend: item.exDividend,
            recordDate: item.recordDate,
            paymentDate: item.paymentDate
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch company financial ratios.
   * @description Returns paginated financial indicators.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @returns Paginated financial ratios response
   */
  async getFinancialRatios(
    year: number,
    month: number
  ): Promise<Types.CompanyPaginatedResponse<Types.FinancialRatio> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_FINANCIAL_DATA_RATIO&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            stockName: string
            sector: string
            subSector: string
            industry: string
            subIndustry: string
            fsDate: string
            assets: number
            liabilities: number
            equity: number
            sales: number
            ebt: number
            profitPeriod: number
            eps: number
            bookValue: number
            per: number
            priceBV: number
            deRatio: number
            roa: number
            roe: number
            npm: number
          }) => ({
            code: item.code,
            name: item.stockName,
            sector: item.sector,
            subSector: item.subSector,
            industry: item.industry,
            subIndustry: item.subIndustry,
            period: item.fsDate,
            assets: item.assets,
            liabilities: item.liabilities,
            equity: item.equity,
            sales: item.sales,
            ebt: item.ebt,
            profit: item.profitPeriod,
            eps: item.eps,
            bookValue: item.bookValue,
            per: item.per,
            pbv: item.priceBV,
            der: item.deRatio,
            roa: item.roa,
            roe: item.roe,
            npm: item.npm
          })
        ),
        recordsTotal: rawResponse.recordsTotal
      }
    } catch {
      return null
    }
  }

  /**
   * Fetch stock new listings IPO.
   * @description Returns paginated list of newly listed stocks.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated new listing events response
   */
  async getNewListings(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.NewListing> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_STOCK_NEW_LISTING&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            issuerName: string
            ListedShares: number
            NumOfShares: number
            Offering: number
            FundRaised: number
            ListingDate: string
          }) => ({
            code: item.code,
            name: item.issuerName,
            listedShares: item.ListedShares,
            offeringShares: item.NumOfShares,
            offeringPrice: item.Offering,
            fundRaised: item.FundRaised,
            listingDate: item.ListingDate
          })
        ),
        recordsTotal: rawResponse.recordsTotal
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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/Home/GetRelistingData?pageSize=${pageSize}&indexFrom=${indexFrom}`
      )
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
   * Fetch right offerings events.
   * @description Returns paginated list of subscription right offerings.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated rights offering response
   */
  async getRightOfferings(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.RightOffering> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_RIGHT_OFFERING&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            issuerName: string
            ratio: string
            exPrice: number
            fundRaised: number
            exDate: string
            recDate: string
            rightCert: string
          }) => ({
            code: item.code,
            name: item.issuerName,
            ratio: item.ratio,
            exercisePrice: item.exPrice,
            fundRaised: item.fundRaised,
            exerciseDate: item.exDate,
            recordingDate: item.recDate,
            tradingPeriod: item.rightCert
          })
        ),
        recordsTotal: rawResponse.recordsTotal
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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/StockData/GetSecuritiesStock?start=${start}&length=${length}&code=${code}&sector=${sector}&board=${board}`
      )
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
   * Fetch stock split announcements.
   * @description Returns paginated list of stock split events.
   * @param year - Target year
   * @param month - Target month (1-12)
   * @param pageSize - Record count limit
   * @param pageNumber - Pagination page number
   * @returns Paginated corporate stock split events response
   */
  async getStockSplits(
    year: number,
    month: number,
    pageSize = 10,
    pageNumber = 1
  ): Promise<Types.CompanyPaginatedResponse<Types.StockSplit> | null> {
    await this.ensureSession()
    try {
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/DigitalStatistic/GetApiDataPaginated?urlName=LINK_STOCK_SPLIT&periodYear=${year}&periodMonth=${month}&periodType=monthly&isPrint=False&cumulative=false&pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !Array.isArray(rawResponse.data)) {
        return null
      }
      return {
        data: rawResponse.data.map(
          (item: {
            code: string
            stockname: string
            ssrs: string
            Ratio: string
            NominalValue: number
            NominalValueNew: number
            AdditionalListedShares: number
            ListedShares: number
            ListingDate: string
          }) => ({
            code: item.code,
            name: item.stockname,
            type: item.ssrs,
            ratio: item.Ratio,
            oldNominal: item.NominalValue,
            newNominal: item.NominalValueNew,
            additionalShares: item.AdditionalListedShares,
            listedShares: item.ListedShares,
            listingDate: item.ListingDate
          })
        ),
        recordsTotal: rawResponse.recordsTotal
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
      const response = await this.fetcherUrl(
        `https://www.idx.co.id/primary/Home/GetSuspendData?resultCount=${resultCount}`
      )
      const rawResponse = await response.json()
      if (!rawResponse || !rawResponse.Results) {
        return null
      }
      return {
        results: rawResponse.Results.map(
          (item: {
            Kode: string
            Judul: string
            Date: string
            Info_Type: string
            Data_Download: string
          }) => ({
            code: item.Kode,
            title: item.Judul,
            date: item.Date,
            type: item.Info_Type,
            downloadUrl: item.Data_Download
          })
        )
      }
    } catch {
      return null
    }
  }
}
