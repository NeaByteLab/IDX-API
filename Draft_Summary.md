# IDX-API Project Summary

## Overview

**IDX-API** adalah sebuah _data bridge_ dan API wrapper yang dibangun dengan **Deno** dan **TypeScript**. Dikembangkan dengan arsitektur modular, project ini memberikan akses data internal Bursa Efek Indonesia (IDX) untuk analisis pasar modal.

---

## Core API Reference

Project ini terbagi menjadi 4 modul utama yang dapat diakses melalui `IDXClient`:

### 1. `company` (Company & Securities)

Modul untuk memantau aktivitas emiten dan status pencatatan saham.

- **`getAnnouncements()`**: Mengambil pengumuman resmi emiten (Dividen, RUPS, Corporate Action). Sangat krusial untuk mencuri _start_ sebelum berita masuk media.
- **`getSecuritiesStock()`**: Mendapatkan _database_ seluruh saham yang tercatat, lengkap dengan jumlah saham beredar dan papan pencatatannya.
- **`getSuspendData()`**: Menampilkan daftar saham yang sedang "digembok" bursa.
- **`getRelistingData()`**: Melacak saham yang kembali aktif diperdagangkan.

### 2. `market` (Market Data & Indices)

Modul untuk melihat pergerakan pasar secara makro.

- **`getIndexList()`**: Monitoring _live_ seluruh indeks bursa (IHSG, Sektoral, LQ45, dll).
- **`getIndexChart()`**: Menarik data historis pergerakan indeks untuk visualisasi tren teknikal.
- **`getCalendar()`**: Kalender agenda pasar modal untuk manajemen risiko.

### 3. `trading` (Market Activities & Bandarmologi Support)

Modul utama untuk analisis aliran dana (_money flow_).

- **`getBrokerSummary()`**: API kunci untuk **Bandarmologi**. Melacak transaksi jual-beli broker tertentu pada tanggal spesifik.
- **`getStockSummary()`**: Ringkasan performa harga seluruh saham (Open, High, Low, Close, Volume).
- **`getTradeSummary()`**: Rekapitulasi perdagangan di seluruh segmen pasar (Reguler, Negosiasi, Tunai).
- **`getMarginSummary()`**: Daftar saham yang bisa ditransaksikan secara margin (leverage).

### 4. `statistics` & `Draft_Statistic_API.md` (Deep Data Discovery)

Modul penemuan otomatis yang mampu menghasilkan ratusan _direct link_ ke data statistik mendalam.

- **`discover()`**: Mesin pencari otomatis yang memetakan API internal IDX ke dalam markdown.
- **Hasil:** File [Draft_Statistic_API.md](file:///Volumes/MasterData/Project-Sandbox/IDX-API/Draft_Statistic_API.md) mengandung akses ke ratusan _endpoint_ internal.

### Unlisted Extension Features (Future Tiered Integration)

Analisis pada `Draft_Statistic_API.md` menunjukkan potensi fitur tambahan yang dikategorikan berdasarkan skala prioritas dan kegunaan untuk investor ritel:

#### TIER 1: Market Intelligence & Money Flow (High Priority)

_Digunakan untuk memantau pergerakan transaksi harian._

- **Investor Type Analysis:** Monitoring detail akumulasi/distribusi Asing vs Domestik (Net Buy/Sell).
- **Top 50 Leaderboards:** Daftar 50 saham paling aktif (Volume, Value, Freq) & Biggest Market Cap secara _real-time_.
- **Corporate Action Alerts:** Data detail _Stock Split_, _Reverse Stock_, _Right Offerings_, dan pengumuman _Dividen_.

#### TIER 2: Industry & Tactical Analysis (Intermediate)

_Membantu strategi rotasi sektor dan pemilihan saham secara spesifik._

- **Industry Classification Performance:** Ringkasan perdagangan dan jumlah saham beredar per industri/sektor.
- **Stock Price & Trading Tables:** Data harga penutupan dan volume perdagangan kolektif untuk seluruh emiten.
- **Index Movement Highlights:** Ringkasan pergerakan IHSG vs Indeks Sektoral secara mendalam.

#### TIER 3: Specialized Instruments (Specialized/Niche)

_Untuk investor yang ingin diversifikasi ke instrumen di luar saham biasa._

- **Bond & ABS Ecosystem:** Data perdagangan Obligasi Korporasi, Pemerintah, dan Efek Beragun Aset.
- **Specialized Transactions:** rincian transaksi per member bursa untuk instrumen spesifik seperti ETF, Warrant, DINFRA, dan REIT.
- **Historical Statistics:** Data bulanan/tahunan untuk perbandingan pertumbuhan pasar modal jangka panjang.

---

## Pros & Cons

### Pros

- **High Integrity Data:** Mengambil langsung dari API internal penggerak web IDX.
- **Developer Friendly:** Full TypeScript dengan dokumentasi JSDoc yang sangat rapi (max. 9 kata per deskripsi).
- **Clean Architecture:** Berbasis Deno yang _lightweight_, tanpa _overhead_ dependencies yang berat.
- **Bandarmologi-Ready:** Struktur data broker sudah siap diumpan ke dashboard visualisasi.

### Cons

- **Scraping Risk:** Sangat tergantung pada kestabilan _endpoint_ internal IDX. Jika struktur internal bursa berubah, sistem perlu penyesuaian.

---

## Potential Tools for Retail (10 Big Opportunities)

Dengan modal data "dapur" IDX yang kita punya, berikut adalah 10 peluang alat bantu investor ritel yang bisa langsung dieksekusi:

1.  **Whale Watcher (Bandar Radar):** Dashboard visual yang melacak akumulasi dan distribusi broker raksasa secara harian (data `getBrokerSummary`).
2.  **AI-Powered News Summarizer:** Bot yang otomatis membaca PDF pengumuman bursa dan memberikan skor sentimen "Bullish/Bearish" pakai LLM (data `getAnnouncements`).
3.  **Alpha Sector Navigator:** Visualisasi rotasi sektor (RRG-style) untuk melihat sektor mana yang sedang mulai "panas" (data `market.getIndexList`).
4.  **Foreign vs Retail Combat Map:** Tracking real-time siapa yang sedang menggerakkan harga (Asing vs Domestik) dari data transaksi investor (data `Draft_Statistic_API.md`).
5.  **Smart Dividend & IPO Tracker:** Kalender otomatis yang memberi push notification harian untuk Cum Date dividen dan status IPO terbaru (data `market.getCalendar` / `getRelistingData`).
6.  **Margin Momentum Screener:** Alat filter saham yang masuk daftar margin tapi punya momentum volume tinggi (data `getMarginSummary` + `getStockSummary`).
7.  **Special Force (Top 50 Mover):** Dashboard leaderboard untuk 50 saham paling aktif dan berkapitalisasi besar sebagai indikator kesehatan bursa (data `Top 50 Lists`).
8.  **Corporate Action Risk Manager:** Sistem peringatan dini untuk potensi suspensi ('gembok') bursa dan pelacakan historis relisting (data `getSuspendData`).
9.  **Industrial Flow Tracker:** Analisis aliran dana masuk/keluar berbasis klasifikasi industri untuk strategi _top-down investing_ (data `Industry Performance`).
10. **Retail Participation Index:** Mapping keterlibatan ritel berdasarkan frekuensi transaksi dan volume di pasar reguler (data `getTradeSummary`).
