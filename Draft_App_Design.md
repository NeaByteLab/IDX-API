# IDX-API Product Design: Menu & Planning

Dokumen ini merancang struktur antarmuka (UI) Sidebar dan rencana pengembangan fitur (Planning) berdasarkan data yang tersedia di `Summary.md` dan `Draft_Statistic_API.md`.

---

## Left Sidebar: Menu & Sub-Menu

Sidebar dirancang untuk memudahkan navigasi berdasarkan profil strategi investor (Trader vs Investor).

### 1. Dashboard

- **Market Overview:** Ringkasan IHSG, volume bursa harian, dan rasio net-buy/sell asing global.
  - _API: `market.getIndexList()`, `trading.getTradeSummary()`_
- **Watchlist:** Daftar saham pilihan user.
  - _API: (Client-side Data Persistence)_

### 2. Market Monitoring

- **Live Indices:** Daftar seluruh indeks (LQ45, IDX30, dll).
  - _API: `market.getIndexList()`_
- **Sectoral Heatmap:** Visualisasi pergerakan sektor yang sedang "panas".
  - _API: `market.getIndexList()` (Sektoral)_
- **Market Calendar:** Jadwal RUPS, Dividen, dan IPO.
  - _API: `market.getCalendar(date)`_

### 3. Bandarmologi (Money Flow)

- **Foreign Flow:** Lacak akumulasi asing vs ritel harian.
  - _API: `Draft_Statistic_API.md` -> (Investor Type Analysis)_
- **Broker Analysis:** Lacak transaksi per-kode broker (Siapa beli apa).
  - _API: `trading.getBrokerSummary(date)`_
- **Investor Type Table:** Detail volume transaksi domestik vs asing.
  - _API: `Draft_Statistic_API.md` -> (Table Daily Trading by Type of Investor)_

### 4. Stock Analytics

- **Live Stock Summary:** Pergerakan harga saham real-time.
  - _API: `trading.getStockSummary(date)`_
- **Advanced Screener:** Filter saham berdasarkan sektor, papan, dan likuiditas.
  - _API: `company.getSecuritiesStock(start, length, code, sector, board)`_
- **Historical Chart:** Analisis teknikal pergerakan harga.
  - _API: `market.getIndexChart(indexCode, period)`_

### 5. Leaderboards

- **Top Gainers / Losers:** Saham dengan kenaikan/penurunan tertinggi.
  - _API: `trading.getStockSummary()` (Sorted by change)_
- **Most Active:** Saham dengan volume, value, dan frekuensi terbesar.
  - _API: `Draft_Statistic_API.md` -> (Most Active Trading Summary)_
- **Biggest Market Cap:** 50 perusahaan raksasa bursa.
  - _API: `Draft_Statistic_API.md` -> (50 Biggest Market Capitalization)_

### 6. News & Corporate Action

- **Live Announcements:** Pengumuman emiten disertai lampiran PDF.
  - _API: `company.getAnnouncements()`_
- **Dividend Tracker:** Jadwal & histori pembayaran dividen.
  - _API: `Draft_Statistic_API.md` -> (Dividend Announcement)_
- **Status Monitor:** Daftar saham yang sedang Suspensi atau baru Relisting.
  - _API: `company.getSuspendData()`, `company.getRelistingData()`_

### 7. Fundamental & Statistics

- **Financial Ratios:** PER, PBV, ROE, DER untuk perbandingan valuasi.
  - _API: `Draft_Statistic_API.md` -> (Financial Data and Ratio)_
- **Statistical Highlights:** Data statistik pasar modal secara makro.
  - _API: `Draft_Statistic_API.md` -> (Statistical Highlight)_

---

## Planning Features: Development Roadmap

Fitur dikembangkan secara bertahap untuk memastikan stabilitas data scraping.

### Phase 1: The Core (Data Foundation)

_Fokus: Penyajian data dasar bursa._

- [ ] **Stock & Index Board:** Panel harga saham dan indeks secara rapi.
- [ ] **News Feed:** Sistem pembaca pengumuman emiten real-time.
- [ ] **Simple Screener:** Filter saham berdasarkan harga dan sektor.

### Phase 2: The Money Flow (Pro Tools)

_Fokus: Analisis bandarmologi yang jadi nilai jual utama._

- [ ] **Foreign Flow Tracker:** Grafik harian akumulasi asing (Net Buy/Sell).
- [ ] **Broker Transaction Summary:** Tabel detail transaksi broker (Top Buyers/Sellers).
- [ ] **Dividend Yield Tracker:** Kalkulator potensi dividen berdasarkan harga saat ini.

### Phase 3: The Intelligence (AI & Advanced Analytics)

_Fokus: Otomatisasi analisis._

- [ ] **AI Snippet Summary:** Rangkuman otomatis isi PDF pengumuman emiten (Bullish/Bearish sentiment).
- [ ] **Sector Rotation Graph (RRG):** Visualisasi rotasi modal dari sektor yang jenuh ke sektor yang baru bangun.
- [ ] **Alert Engine:** Notifikasi (Telegram/Web) saat ada saham yang menyentuh batas ARA/ARB atau ada transaksi blok yang masif.

---

**LFG! Struktur ini bikin aplikasi lo setara dengan platform profesional tapi lebih berorientasi pada data "Deep-IDX".**
