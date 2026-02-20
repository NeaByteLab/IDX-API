# IDX Sample Database Reference

This document provides a detailed reference for the `sample-database.sqlite` file.

## `active_frequency`

### Columns

| Name                | Type      | PK  |
| ------------------- | --------- | --- |
| `id`                | `TEXT`    | ✅  |
| `code`              | `TEXT`    | -   |
| `name`              | `TEXT`    | -   |
| `volume`            | `INTEGER` | -   |
| `value`             | `REAL`    | -   |
| `frequency`         | `INTEGER` | -   |
| `volume_percent`    | `REAL`    | -   |
| `value_percent`     | `REAL`    | -   |
| `frequency_percent` | `REAL`    | -   |
| `trading_days`      | `INTEGER` | -   |
| `period`            | `INTEGER` | -   |

### Data Sample

| id                 | code | name                            | volume       | value            | frequency | volume_percent   | value_percent    | frequency_percent | trading_days | period        |
| ------------------ | ---- | ------------------------------- | ------------ | ---------------- | --------- | ---------------- | ---------------- | ----------------- | ------------ | ------------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk              | 197960164721 | 75148235928216.0 | 5337295   | 15.9202636565538 | 10.7629711089837 | 6.99178114851703  | 20           | 1767200400000 |
| DEWA-1767200400000 | DEWA | Darma Henwa Tbk                 | 31204154287  | 21903437559535.0 | 1957373   | 2.50948651274851 | 3.13708050134264 | 2.56413101430898  | 20           | 1767200400000 |
| INET-1767200400000 | INET | Sinergi Inti Andalan Prima Tbk. | 18116933658  | 9287358767275.0  | 1592148   | 1.45699192001661 | 1.33016527741824 | 2.08569141710344  | 20           | 1767200400000 |

## `active_value`

### Columns

| Name                | Type      | PK  |
| ------------------- | --------- | --- |
| `id`                | `TEXT`    | ✅  |
| `code`              | `TEXT`    | -   |
| `name`              | `TEXT`    | -   |
| `volume`            | `INTEGER` | -   |
| `value`             | `REAL`    | -   |
| `frequency`         | `INTEGER` | -   |
| `volume_percent`    | `REAL`    | -   |
| `value_percent`     | `REAL`    | -   |
| `frequency_percent` | `REAL`    | -   |
| `trading_days`      | `INTEGER` | -   |
| `period`            | `INTEGER` | -   |

### Data Sample

| id                 | code | name                   | volume       | value            | frequency | volume_percent    | value_percent    | frequency_percent | trading_days | period        |
| ------------------ | ---- | ---------------------- | ------------ | ---------------- | --------- | ----------------- | ---------------- | ----------------- | ------------ | ------------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk     | 197960164721 | 75148235928216.0 | 5337295   | 15.9202636565538  | 10.7629711089837 | 6.99178114851703  | 20           | 1767200400000 |
| BBCA-1767200400000 | BBCA | Bank Central Asia Tbk. | 5930294765   | 43956252932828.0 | 1327772   | 0.476923508085287 | 6.29555537174721 | 1.73936258706494  | 20           | 1767200400000 |
| ANTM-1767200400000 | ANTM | Aneka Tambang Tbk      | 6325016260   | 25680051985721.0 | 1498326   | 0.508667623272126 | 3.67797931894947 | 1.96278592079563  | 20           | 1767200400000 |

## `active_volume`

### Columns

| Name                | Type      | PK  |
| ------------------- | --------- | --- |
| `id`                | `TEXT`    | ✅  |
| `code`              | `TEXT`    | -   |
| `name`              | `TEXT`    | -   |
| `volume`            | `INTEGER` | -   |
| `value`             | `REAL`    | -   |
| `frequency`         | `INTEGER` | -   |
| `volume_percent`    | `REAL`    | -   |
| `value_percent`     | `REAL`    | -   |
| `frequency_percent` | `REAL`    | -   |
| `trading_days`      | `INTEGER` | -   |
| `period`            | `INTEGER` | -   |

### Data Sample

| id                 | code | name                      | volume       | value            | frequency | volume_percent   | value_percent     | frequency_percent | trading_days | period        |
| ------------------ | ---- | ------------------------- | ------------ | ---------------- | --------- | ---------------- | ----------------- | ----------------- | ------------ | ------------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk        | 197960164721 | 75148235928216.0 | 5337295   | 15.9202636565538 | 10.7629711089837  | 6.99178114851703  | 20           | 1767200400000 |
| GOTO-1767200400000 | GOTO | GoTo Gojek Tokopedia Tbk. | 150007130455 | 9622448193024.0  | 678545    | 12.0638062237039 | 1.37815785853096  | 0.888884376715263 | 20           | 1767200400000 |
| BKSL-1767200400000 | BKSL | Sentul City Tbk           | 44491906992  | 6954662609717.0  | 1235880   | 3.57810820623331 | 0.996069060258645 | 1.61898536352763  | 20           | 1767200400000 |

## `additional_listing`

### Columns

| Name         | Type      | PK  |
| ------------ | --------- | --- |
| `id`         | `TEXT`    | ✅  |
| `code`       | `TEXT`    | -   |
| `name`       | `TEXT`    | -   |
| `shares`     | `INTEGER` | -   |
| `type`       | `TEXT`    | -   |
| `start_date` | `INTEGER` | -   |
| `last_date`  | `INTEGER` | -   |
| `period`     | `INTEGER` | -   |

### Data Sample

| id                 | code | name                              | shares    | type    | start_date    | last_date     | period        |
| ------------------ | ---- | --------------------------------- | --------- | ------- | ------------- | ------------- | ------------- |
| ACRO-1767312000000 | ACRO | PT Samcro Hyosung Adilestari Tbk. | 1090      | Warrant | 1767312000000 | 1767312000000 | 1767200400000 |
| BAIK-1769385600000 | BAIK | PT Bersama Mencapai Puncak Tbk.   | 2014      | Warrant | 1769385600000 | 1769644800000 | 1767200400000 |
| BANK-1769385600000 | BANK | PT Bank Net Indonesia Syariah Tbk | 122231662 | Warrant | 1769385600000 | 1769731200000 | 1767200400000 |

## `broker_summary`

### Columns

| Name          | Type      | PK  |
| ------------- | --------- | --- |
| `id`          | `INTEGER` | ✅  |
| `date`        | `INTEGER` | -   |
| `broker_code` | `TEXT`    | -   |
| `broker_name` | `TEXT`    | -   |
| `total_value` | `REAL`    | -   |
| `volume`      | `INTEGER` | -   |
| `frequency`   | `INTEGER` | -   |

### Data Sample

| id     | date          | broker_code | broker_name                 | total_value   | volume   | frequency |
| ------ | ------------- | ----------- | --------------------------- | ------------- | -------- | --------- |
| 902895 | 1704128400000 | AF          | Harita Kencana Sekuritas    | 1959134300.0  | 2582300  | 200       |
| 902896 | 1704128400000 | AG          | Kiwoom Sekuritas Indonesia  | 92360261300.0 | 99599600 | 12270     |
| 902897 | 1704128400000 | AH          | Shinhan Sekuritas Indonesia | 15199874700.0 | 35798900 | 1489      |

## `company_announcement`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `id`           | `TEXT`    | ✅  |
| `number`       | `TEXT`    | -   |
| `date`         | `INTEGER` | -   |
| `title`        | `TEXT`    | -   |
| `type`         | `TEXT`    | -   |
| `company_code` | `TEXT`    | -   |
| `created_date` | `INTEGER` | -   |
| `form_id`      | `TEXT`    | -   |
| `subject`      | `TEXT`    | -   |
| `is_stock`     | `INTEGER` | -   |
| `is_bond`      | `INTEGER` | -   |
| `attachments`  | `TEXT`    | -   |

### Data Sample

| id                                          | number                 | date          | title                                                            | type  | company_code | created_date  | form_id | subject                        | is_stock | is_bond | attachments                                                                                          |
| ------------------------------------------- | ---------------------- | ------------- | ---------------------------------------------------------------- | ----- | ------------ | ------------- | ------- | ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| 20240101230334-25/122023/FS-HSS/ABFII_id-id | 25/122023/FS-HSS/ABFII | 1704125014000 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | 1704125022000 | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"fb3260d796_2bdf042dce.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncem... |
| 20240101224724-24/122023/FS-HSS/ABFII_id-id | 24/122023/FS-HSS/ABFII | 1704124044000 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | 1704124050000 | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"580cb4be41_4a79f3043a.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncem... |
| 20240101224458-23/122023/FS-HSS/ABFII_id-id | 23/122023/FS-HSS/ABFII | 1704123898000 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | 1704123911000 | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"672f56cf10_baf755af6c.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncem... |

## `company_delisting`

### Columns

| Name             | Type      | PK  |
| ---------------- | --------- | --- |
| `id`             | `TEXT`    | ✅  |
| `code`           | `TEXT`    | -   |
| `name`           | `TEXT`    | -   |
| `listed_shares`  | `REAL`    | -   |
| `market_cap`     | `REAL`    | -   |
| `regular_price`  | `REAL`    | -   |
| `last_date`      | `INTEGER` | -   |
| `listing_date`   | `INTEGER` | -   |
| `delisting_date` | `INTEGER` | -   |
| `period`         | `INTEGER` | -   |

### Data Sample

| id                 | code | name                          | listed_shares | market_cap    | regular_price | last_date     | listing_date  | delisting_date | period        |
| ------------------ | ---- | ----------------------------- | ------------- | ------------- | ------------- | ------------- | ------------- | -------------- | ------------- |
| JKSW-1752771600000 | JKSW | Jakarta Kyoei Steel Works Tbk | 150000.0      | 9000.0        | 60.0          | 1752771600000 | 870800400000  | 1752771600000  | 1751302800000 |
| KPAL-1752771600000 | KPAL | Steadfast Marine Tbk          | 1069009.4     | 53450.47      | 50.0          | 1752771600000 | 1528390800000 | 1752771600000  | 1751302800000 |
| NIPS-1752771600000 | NIPS | Nipress Tbk                   | 1635333.332   | 461163.999624 | 282.0         | 1752771600000 | 680288400000  | 1752771600000  | 1751302800000 |

## `company_detail`

### Columns

| Name                | Type   | PK  |
| ------------------- | ------ | --- |
| `code`              | `TEXT` | ✅  |
| `address`           | `TEXT` | -   |
| `bae`               | `TEXT` | -   |
| `industry`          | `TEXT` | -   |
| `sub_industry`      | `TEXT` | -   |
| `email`             | `TEXT` | -   |
| `fax`               | `TEXT` | -   |
| `business_activity` | `TEXT` | -   |
| `phone`             | `TEXT` | -   |
| `website`           | `TEXT` | -   |
| `npwp`              | `TEXT` | -   |
| `history`           | `TEXT` | -   |
| `board`             | `TEXT` | -   |
| `sector`            | `TEXT` | -   |
| `sub_sector`        | `TEXT` | -   |
| `status`            | `TEXT` | -   |
| `secretary`         | `TEXT` | -   |
| `directors`         | `TEXT` | -   |
| `commissioners`     | `TEXT` | -   |
| `committees`        | `TEXT` | -   |
| `shareholders`      | `TEXT` | -   |
| `subsidiaries`      | `TEXT` | -   |

### Data Sample

| code | address                                                                                              | bae                       | industry                 | sub_industry                | email                     | fax                          | business_activity                                                                                    | phone           | website                     | npwp                  | history | board             | sector                     | sub_sector              | status | secretary                                                                                  | directors                                                                                            | commissioners                                                                                        | committees | shareholders                                                                                         | subsidiaries                                                                                         |
| ---- | ---------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------ | --------------------------- | ------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | --------------- | --------------------------- | --------------------- | ------- | ----------------- | -------------------------- | ----------------------- | ------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| AADI | Cyber 2 Tower Lantai 26 Jl. H.R. Rasuna Said Blok X-5, No.13 Jakarta 12950 - Indonesia               | PT. Datindo Entrycom      | Batu Bara                | Produksi Batu Bara          | corsec@adaroindonesia.com | (021) 2553 3066              | Perkebunan kelapa sawit, karet dan tanaman penghasil getah lain, perusahaan holding, dan konsulta... | (021) 2553 3065 | www.adaroindonesia.com      | 02.433.115.9-091.000  |         | Utama             | Energi                     | Minyak, Gas & Batu Bara | 0.0    | [{"name":"Ray Aryaputra","email":"corsec@adaroindonesia.com","phone":"(021) 2553 3065"}]   | [{"name":"Julius Aslan","position":"DIREKTUR UTAMA"},{"name":"Priyadi","position":"DIREKTUR"},{"n... | [{"name":"Budi Bowoleksono","position":"KOMISARIS UTAMA"},{"name":"Primus Dorimulu","position":"K... | []         | [{"name":"Budi Bowoleksono","count":0,"percentage":0},{"name":"Primus Dorimulu","count":8500,"per... | [{"name":"Adaro Australia Pty Ltd","location":"Australia","percentage":90,"unit":"RIBUAN"},{"name... |
| AALI | Jl. Puloayang Raya Kawasan Industri Pulo Gadung, OR, 1, Jatinegara, Cakung, Kota ADM, Jakarta Tim... | PT. Raya Saham Registra   | Produk Makanan Pertanian | Perkebunan & Tanaman Pangan | Investor@astra-agro.co.id | 461-6655, 461-6677, 461-6688 | Agriculture Plantation                                                                               | 461-65-55       | http://www.astra-agro.co.id | 001.334.427.0-054.000 |         | Utama             | Barang Konsumen Primer     | Makanan & Minuman       | 0.0    | [{"name":"Tingning Sukowignjo","email":"investor@astra-agro.co.id","phone":"021-4616555"}] | [{"name":"DJAP TET FA","position":"PRESIDEN DIREKTUR"},{"name":"EKO PRASETYO","position":"DIREKTU... | [{"name":"SANTOSA","position":"PRESIDEN KOMISARIS"},{"name":"JOHANNES LOMAN","position":"KOMISARI... | []         | [{"name":"PT Astra International Tbk","count":340510927,"percentage":17.69},{"name":"PT Astra Int... | [{"name":"PT Agro Menara Rachmat ","location":"Kalimantan Tengah","percentage":99.99,"unit":"JUTA... |
| ABBA | Sahid Sudirman Centre Lt. 10, Jl. Jend. Sudirman No. 86, Jakarta 10220                               | PT. Adimitra Jasa Korpora | Media                    | Penerbitan                  | corsec@mahakax.com        | (021) 573 9210               | Media dan Percetakan                                                                                 | (021) 573 9203  | www.mahakax.com             | 01.609.052.4-054.000  |         | Pemantauan Khusus | Barang Konsumen Non-Primer | Media & Hiburan         | 0.0    | [{"name":"S. Pramudityo Anggoro","email":"corsec@mahakamedia.com","phone":"021-5739203"}]  | [{"name":"Ronny Wilimas Sugiadha","position":"DIREKTUR UTAMA"},{"name":"Muhammad Fadri Attamimi",... | [{"name":"Martin Suharlie","position":"KOMISARIS"},{"name":"Aldo Rambie","position":"KOMISARIS UT... | []         | [{"name":"PT Beyond Media","count":1592831618,"percentage":40.47},{"name":"PT Solic Kreasi Baru",... | [{"name":"PT AKASIA CEPAT INDONESIA","location":"JAKARTA","percentage":50,"unit":"PENUH"},{"name"... |

## `company_dividend`

### Columns

| Name            | Type      | PK  |
| --------------- | --------- | --- |
| `id`            | `TEXT`    | ✅  |
| `code`          | `TEXT`    | -   |
| `name`          | `TEXT`    | -   |
| `cash_dividend` | `REAL`    | -   |
| `cum_dividend`  | `INTEGER` | -   |
| `ex_dividend`   | `INTEGER` | -   |
| `record_date`   | `INTEGER` | -   |
| `payment_date`  | `INTEGER` | -   |
| `period`        | `INTEGER` | -   |

### Data Sample

| id                 | code | name                          | cash_dividend | cum_dividend  | ex_dividend   | record_date   | payment_date  | period        |
| ------------------ | ---- | ----------------------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| RAJA-1768176000000 | RAJA | Rukun Raharja Tbk             | 25.0          | 1767830400000 | 1767916800000 | 1768176000000 | 1769558400000 | 1767200400000 |
| BSSR-1767657600000 | BSSR | Baramulti Suksessarana Tbk    | 127.41448     | 1767312000000 | 1767571200000 | 1767657600000 | 1768435200000 | 1767200400000 |
| CDIA-1768262400000 | CDIA | PT Chandra Daya Investasi Tbk | 1.34          | 1767916800000 | 1768176000000 | 1768262400000 | 1769644800000 | 1767200400000 |

## `company_profile`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `code`         | `TEXT`    | ✅  |
| `name`         | `TEXT`    | -   |
| `listing_date` | `INTEGER` | -   |

### Data Sample

| code | name                           | listing_date |
| ---- | ------------------------------ | ------------ |
| AADI | PT Adaro Andalan Indonesia Tbk | 1733331600   |
| AALI | Astra Agro Lestari Tbk         | 881600400    |
| ABBA | Mahaka Media Tbk               | 1017766800   |

## `company_relisting`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `code`         | `TEXT`    | ✅  |
| `name`         | `TEXT`    | -   |
| `listing_date` | `INTEGER` | -   |

### Data Sample

| code | name                             | listing_date  |
| ---- | -------------------------------- | ------------- |
| SUPA | PT Super Bank Indonesia Tbk      | 1765904400000 |
| RLCO | PT Abadi Lestari Indonesia Tbk   | 1765126800000 |
| PJHB | PT Pelayaran Jaya Hidup Baru Tbk | 1762362000000 |

## `company_suspend`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `id`           | `TEXT`    | ✅  |
| `code`         | `TEXT`    | -   |
| `title`        | `TEXT`    | -   |
| `date`         | `INTEGER` | -   |
| `type`         | `TEXT`    | -   |
| `download_url` | `TEXT`    | -   |

### Data Sample

| id                    | code    | title                                                                            | date          | type      | download_url                                                                                         |
| --------------------- | ------- | -------------------------------------------------------------------------------- | ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| HOMI-1771577821000    | HOMI    | Pembukaan Penghentian Sementara Perdagangan Efek PT Grand House Mulia Tbk (HOMI) | 1771577821000 | Unsuspend | /StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/From_EREP/202602/69d277401c_c1242d64ee.pdf         |
| >1 Kode-1771552782000 | >1 Kode | Pembukaan Penghentian Sementara Perdagangan Efek (>1 Kode)                       | 1771552782000 | Unsuspend | /StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/From_EREP/202602/cd907e072e_475281cb0d.pdf         |
| HILL-1771522200000    | HILL    | Pembukaan Kembali Perdagangan Saham PT Hillcon Tbk. (HILL)                       | 1771522200000 | Unsuspend | /Portals/0/StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/Exchange/2026/FEB/20260220-WAS_Unsusp... |

## `daily_index`

### Columns

| Name     | Type      | PK  |
| -------- | --------- | --- |
| `id`     | `TEXT`    | ✅  |
| `name`   | `TEXT`    | -   |
| `close`  | `REAL`    | -   |
| `date`   | `INTEGER` | -   |
| `period` | `INTEGER` | -   |

### Data Sample

| id                            | name            | close   | date          | period        |
| ----------------------------- | --------------- | ------- | ------------- | ------------- |
| Composite Index-1767312000000 | Composite Index | 8748.13 | 1767312000000 | 1767200400000 |
| Composite Index-1767571200000 | Composite Index | 8859.19 | 1767571200000 | 1767200400000 |
| Composite Index-1767657600000 | Composite Index | 8933.61 | 1767657600000 | 1767200400000 |

## `domestic_trading`

### Columns

| Name             | Type      | PK  |
| ---------------- | --------- | --- |
| `date`           | `INTEGER` | ✅  |
| `buy_volume`     | `INTEGER` | -   |
| `buy_value`      | `REAL`    | -   |
| `buy_frequency`  | `INTEGER` | -   |
| `sell_volume`    | `INTEGER` | -   |
| `sell_value`     | `REAL`    | -   |
| `sell_frequency` | `INTEGER` | -   |
| `period`         | `INTEGER` | -   |

### Data Sample

| date          | buy_volume  | buy_value        | buy_frequency | sell_volume | sell_value       | sell_frequency | period        |
| ------------- | ----------- | ---------------- | ------------- | ----------- | ---------------- | -------------- | ------------- |
| 1767312000000 | 40571863543 | 17081040966513.0 | 2652477       | 29710936601 | 12427522085607.0 | 2279894        | 1767200400000 |
| 1767571200000 | 55911368526 | 23300045388011.0 | 3368019       | 45651513944 | 18323360270828.0 | 2988110        | 1767200400000 |
| 1767657600000 | 52912988825 | 25679261838915.0 | 3661161       | 44535351485 | 19408704376430.0 | 3213652        | 1767200400000 |

## `financial_ratio`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `id`           | `TEXT`    | ✅  |
| `code`         | `TEXT`    | -   |
| `name`         | `TEXT`    | -   |
| `sector`       | `TEXT`    | -   |
| `sub_sector`   | `TEXT`    | -   |
| `industry`     | `TEXT`    | -   |
| `sub_industry` | `TEXT`    | -   |
| `period`       | `INTEGER` | -   |
| `assets`       | `REAL`    | -   |
| `liabilities`  | `REAL`    | -   |
| `equity`       | `REAL`    | -   |
| `sales`        | `REAL`    | -   |
| `ebt`          | `REAL`    | -   |
| `profit`       | `REAL`    | -   |
| `eps`          | `REAL`    | -   |
| `book_value`   | `REAL`    | -   |
| `per`          | `REAL`    | -   |
| `pbv`          | `REAL`    | -   |
| `der`          | `REAL`    | -   |
| `roa`          | `REAL`    | -   |
| `roe`          | `REAL`    | -   |
| `npm`          | `REAL`    | -   |

### Data Sample

| id                 | code | name                           | sector | sub_sector      | industry | sub_industry    | period        | assets    | liabilities | equity   | sales    | ebt     | profit   | eps    | book_value | per   | pbv  | der  | roa     | roe     | npm     |
| ------------------ | ---- | ------------------------------ | ------ | --------------- | -------- | --------------- | ------------- | --------- | ----------- | -------- | -------- | ------- | -------- | ------ | ---------- | ----- | ---- | ---- | ------- | ------- | ------- |
| AADI-1759190400000 | AADI | PT Adaro Andalan Indonesia Tbk | Energy | Oil, Gas & Coal | Coal     | Coal Production | 1759190400000 | 102020.24 | 38712.12    | 63308.12 | 60243.56 | 13563.2 | 10931.07 | 1681.8 | 8130.09    | 4.52  | 0.93 | 0.61 | 12.8367 | 20.6861 | 21.7384 |
| ABMM-1759190400000 | ABMM | ABM Investama Tbk              | Energy | Oil, Gas & Coal | Coal     | Coal Production | 1759190400000 | 34703.03  | 20260.6     | 14442.43 | 13047.28 | 717.99  | 704.54   | 459.29 | 5245.76    | 6.27  | 0.55 | 1.4  | 3.6438  | 8.7555  | 9.6917  |
| ADMR-1759190400000 | ADMR | Adaro Minerals Indonesia Tbk   | Energy | Oil, Gas & Coal | Coal     | Coal Production | 1759190400000 | 44246.46  | 16625.59    | 27620.87 | 11269.51 | 4253.5  | 3366.79  | 132.63 | 675.62     | 14.97 | 2.94 | 0.6  | 12.2546 | 19.6309 | 48.1142 |

## `financial_report`

### Columns

| Name          | Type      | PK  |
| ------------- | --------- | --- |
| `id`          | `TEXT`    | ✅  |
| `code`        | `TEXT`    | -   |
| `name`        | `TEXT`    | -   |
| `year`        | `INTEGER` | -   |
| `period`      | `TEXT`    | -   |
| `attachments` | `TEXT`    | -   |

### Data Sample

| id            | code | name                           | year | period | attachments                                                                                          |
| ------------- | ---- | ------------------------------ | ---- | ------ | ---------------------------------------------------------------------------------------------------- |
| AADI-2025-TW3 | AADI | PT Adaro Andalan Indonesia Tbk | 2025 | TW3    | [{"id":"7835b7d5-137f-40d8-b8e1-5b7c8520ea23","name":"FS Adaro Andalan Indonesia Tbk 30 September... |
| AALI-2025-TW3 | AALI | Astra Agro Lestari Tbk         | 2025 | TW3    | [{"id":"3ed2f811-5bf4-40fb-9190-ee091129e133","name":"AALI Surat Pernyataan Direksi LK TW III 202... |
| ABBA-2025-TW3 | ABBA | Mahaka Media Tbk               | 2025 | TW3    | [{"id":"5cb8f9aa-b423-4799-9269-1a1f71a50653","name":"instance.zip","path":"/Portals/0/StaticData... |

## `foreign_trading`

### Columns

| Name             | Type      | PK  |
| ---------------- | --------- | --- |
| `date`           | `INTEGER` | ✅  |
| `buy_volume`     | `INTEGER` | -   |
| `buy_value`      | `REAL`    | -   |
| `buy_frequency`  | `INTEGER` | -   |
| `sell_volume`    | `INTEGER` | -   |
| `sell_value`     | `REAL`    | -   |
| `sell_frequency` | `INTEGER` | -   |
| `period`         | `INTEGER` | -   |

### Data Sample

| date          | buy_volume  | buy_value       | buy_frequency | sell_volume | sell_value      | sell_frequency | period        |
| ------------- | ----------- | --------------- | ------------- | ----------- | --------------- | -------------- | ------------- |
| 1767312000000 | 8259801510  | 5073641285159.0 | 424292        | 2127777683  | 1482658789446.0 | 59938          | 1767200400000 |
| 1767571200000 | 12404383382 | 6953931233010.0 | 599736        | 2643848503  | 2016126070123.0 | 88521          | 1767200400000 |
| 1767657600000 | 12999971656 | 8365537343435.0 | 658573        | 2180551911  | 2686057341997.0 | 97715          | 1767200400000 |

## `index_chart`

### Columns

| Name    | Type      | PK  |
| ------- | --------- | --- |
| `id`    | `TEXT`    | ✅  |
| `code`  | `TEXT`    | -   |
| `date`  | `INTEGER` | -   |
| `value` | `REAL`    | -   |

### Data Sample

| id                      | code      | date          | value    |
| ----------------------- | --------- | ------------- | -------- |
| COMPOSITE-1740096000000 | COMPOSITE | 1740096000000 | 6803.001 |
| COMPOSITE-1740355200000 | COMPOSITE | 1740355200000 | 6749.601 |
| COMPOSITE-1740441600000 | COMPOSITE | 1740441600000 | 6587.087 |

## `index_list`

### Columns

| Name      | Type   | PK  |
| --------- | ------ | --- |
| `code`    | `TEXT` | ✅  |
| `close`   | `TEXT` | -   |
| `change`  | `TEXT` | -   |
| `percent` | `TEXT` | -   |
| `current` | `TEXT` | -   |

### Data Sample

| code       | close     | change | percent | current   |
| ---------- | --------- | ------ | ------- | --------- |
| COMPOSITE  | 8.274,081 | -2,314 | -0,03%  | 8.271,767 |
| LQ45       | 834,284   | 0,995  | 0,12%   | 835,279   |
| IDXLQ45LCL | 117,065   | 0,302  | 0,26%   | 117,367   |

## `index_summary`

### Columns

| Name         | Type      | PK  |
| ------------ | --------- | --- |
| `id`         | `INTEGER` | ✅  |
| `code`       | `TEXT`    | -   |
| `name`       | `TEXT`    | -   |
| `date`       | `INTEGER` | -   |
| `previous`   | `REAL`    | -   |
| `high`       | `REAL`    | -   |
| `low`        | `REAL`    | -   |
| `close`      | `REAL`    | -   |
| `change`     | `REAL`    | -   |
| `percent`    | `REAL`    | -   |
| `volume`     | `INTEGER` | -   |
| `value`      | `REAL`    | -   |
| `frequency`  | `INTEGER` | -   |
| `market_cap` | `REAL`    | -   |

### Data Sample

| id     | code      | name      | date          | previous | high     | low      | close    | change | percent | volume      | value           | frequency | market_cap           |
| ------ | --------- | --------- | ------------- | -------- | -------- | -------- | -------- | ------ | ------- | ----------- | --------------- | --------- | -------------------- |
| 165976 | COMPOSITE | COMPOSITE | 1704128400000 | 7272.797 | 7323.588 | 7245.566 | 7323.588 | 50.791 | 0.7     | 13235788360 | 6783677461899.0 | 905619    | 1.17606655297446e+16 |
| 165977 | LQ45      | LQ45      | 1704128400000 | 970.568  | 979.433  | 966.474  | 979.433  | 8.865  | 0.91    | 2569885367  | 3586867554536.0 | 250577    | 5.79141316079658e+15 |
| 165978 | JII       | JII       | 1704128400000 | 535.678  | 545.384  | 534.653  | 545.384  | 9.706  | 1.81    | 1842199721  | 1805892008408.0 | 138226    | 2.56341966809769e+15 |

## `industry_trading`

### Columns

| Name         | Type      | PK  |
| ------------ | --------- | --- |
| `id`         | `TEXT`    | ✅  |
| `date`       | `INTEGER` | -   |
| `industry`   | `TEXT`    | -   |
| `members`    | `INTEGER` | -   |
| `shares`     | `INTEGER` | -   |
| `market_cap` | `REAL`    | -   |
| `volume`     | `REAL`    | -   |
| `value`      | `REAL`    | -   |
| `frequency`  | `INTEGER` | -   |
| `per`        | `REAL`    | -   |
| `pbv`        | `REAL`    | -   |
| `period`     | `INTEGER` | -   |

### Data Sample

| id                                   | date          | industry               | members | shares        | market_cap    | volume       | value        | frequency | per   | pbv  | period        |
| ------------------------------------ | ------------- | ---------------------- | ------- | ------------- | ------------- | ------------ | ------------ | --------- | ----- | ---- | ------------- |
| A. Energy-1769731200000              | 1769731200000 | A. Energy              | 91      | 1352195212349 | 2457973735.57 | 360827337.06 | 214100384.83 | 19441846  | 18.14 | 3.55 | 1767200400000 |
| A1. Oil, Gas & Coal-1769731200000    | 1769731200000 | A1. Oil, Gas & Coal    | 89      | 1348815413507 | 2457698288.88 | 360626977.76 | 214073948.17 | 19423035  | 18.1  | 3.55 | 1767200400000 |
| A2. Alternative Energy-1769731200000 | 1769731200000 | A2. Alternative Energy | 2       | 3379798842    | 275446.69     | 200359.3     | 26436.66     | 18811     | 18.53 | 1.74 | 1767200400000 |

## `issued_history`

### Columns

| Name           | Type      | PK  |
| -------------- | --------- | --- |
| `id`           | `INTEGER` | ✅  |
| `code`         | `TEXT`    | -   |
| `date`         | `TEXT`    | -   |
| `type`         | `TEXT`    | -   |
| `shares`       | `INTEGER` | -   |
| `total_shares` | `INTEGER` | -   |

### Data Sample

| id   | code | date                | type       | shares     | total_shares |
| ---- | ---- | ------------------- | ---------- | ---------- | ------------ |
| 3389 | AALI | 2016-06-24T00:00:00 | hmetd      | 1615829    | 1924688333   |
| 4423 | AALI | 1997-12-09T00:00:00 | ipo        | 1258000000 | 1258000000   |
| 4424 | AALI | 1999-07-06T00:00:00 | sahamBonus | 251600000  | 1509600000   |

## `market_calendar`

### Columns

| Name          | Type      | PK  |
| ------------- | --------- | --- |
| `id`          | `INTEGER` | ✅  |
| `code`        | `TEXT`    | -   |
| `type`        | `TEXT`    | -   |
| `description` | `TEXT`    | -   |
| `location`    | `TEXT`    | -   |
| `step`        | `TEXT`    | -   |
| `date`        | `INTEGER` | -   |
| `year`        | `TEXT`    | -   |

### Data Sample

| id     | code | type    | description                                                 | location                                                                                             | step    | date          | year |
| ------ | ---- | ------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------- | ------------- | ---- |
| 109872 | TGUK | Rencana | Pemberitahuan RUPS Rencana PT Platinum Wahab Nusantara Tbk. | Gedung Foresta Business Loft 5 no 25 Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Bante...  | rencana | 1704387600000 |      |
| 109912 | PYFA | Rencana | Pemberitahuan RUPS Rencana PT Pyridam Farma Tbk             | Sinarmas MSIG Tower, Lantai 12, Jl. Jend. Sudirman No. Kav, 21, Kuningan, Jakarta Selatan, Indonesia | rencana | 1704301200000 |      |
| 109995 | YELO | Rencana | Pemberitahuan RUPS Rencana PT Yelooo Integra Datanet Tbk.   | Axa Tower LT. 42 JL. Prof DR. Satrio Kav 18 Karet Kuningan, Setiabudi, Jakarta Selatan 12940         | rencana | 1704646800000 |      |

## `new_listing`

### Columns

| Name              | Type      | PK  |
| ----------------- | --------- | --- |
| `code`            | `TEXT`    | ✅  |
| `name`            | `TEXT`    | -   |
| `listed_shares`   | `INTEGER` | -   |
| `offering_shares` | `INTEGER` | -   |
| `offering_price`  | `REAL`    | -   |
| `fund_raised`     | `REAL`    | -   |
| `listing_date`    | `INTEGER` | -   |
| `period`          | `INTEGER` | -   |

### Data Sample

| code | name                             | listed_shares | offering_shares | offering_price | fund_raised     | listing_date  | period        |
| ---- | -------------------------------- | ------------- | --------------- | -------------- | --------------- | ------------- | ------------- |
| PJHB | PT Pelayaran Jaya Hidup Baru Tbk | 1920000000    | 480000000       | 330.0          | 158400000000.0  | 1762387200000 | 1761930000000 |
| RLCO | PT Abadi Lestari Indonesia Tbk   | 3125000000    | 625000000       | 168.0          | 105000000000.0  | 1765152000000 | 1764522000000 |
| SUPA | PT Super Bank Indonesia Tbk      | 33558047450   | 4406612300      | 635.0          | 2798198810500.0 | 1765929600000 | 1764522000000 |

## `participant_broker`

### Columns

| Name      | Type   | PK  |
| --------- | ------ | --- |
| `code`    | `TEXT` | ✅  |
| `name`    | `TEXT` | -   |
| `license` | `TEXT` | -   |

### Data Sample

| code | name                           | license                                      |
| ---- | ------------------------------ | -------------------------------------------- |
| XC   | AJAIB SEKURITAS ASIA           | Penjamin Emisi Efek, Perantara Pedagang Efek |
| PP   | ALDIRACITA SEKURITAS INDONESIA | Penjamin Emisi Efek, Perantara Pedagang Efek |
| YO   | AMANTARA SEKURITAS INDONESIA   | Penjamin Emisi Efek, Perantara Pedagang Efek |

## `participant_dealer`

### Columns

| Name         | Type      | PK  |
| ------------ | --------- | --- |
| `code`       | `TEXT`    | ✅  |
| `name`       | `TEXT`    | -   |
| `license`    | `TEXT`    | -   |
| `is_primary` | `INTEGER` | -   |

### Data Sample

| code | name                       | license | is_primary |
| ---- | -------------------------- | ------- | ---------- |
| ANZP | Bank ANZ Indonesia         |         | 1          |
| BBCA | Bank Central Asia, Tbk.    |         | 1          |
| BBII | Bank Maybank Indonesia Tbk |         | 1          |

## `participant_profile`

### Columns

| Name         | Type      | PK  |
| ------------ | --------- | --- |
| `code`       | `TEXT`    | ✅  |
| `name`       | `TEXT`    | -   |
| `license`    | `TEXT`    | -   |
| `is_primary` | `INTEGER` | -   |

### Data Sample

| code   | name                               | license | is_primary |
| ------ | ---------------------------------- | ------- | ---------- |
| B-AG   | Bank Artha Graha Internasional Tbk | Bank    | 0          |
| B-AGRO | Bank Raya Indonesia, Tbk           | Bank    | 0          |
| B-ANZP | Bank ANZ Indonesia                 | Bank    | 0          |

## `profile_announcement`

### Columns

| Name          | Type   | PK  |
| ------------- | ------ | --- |
| `id`          | `TEXT` | ✅  |
| `date`        | `TEXT` | -   |
| `title`       | `TEXT` | -   |
| `attachments` | `TEXT` | -   |

### Data Sample

| id                   | date                | title                                                                          | attachments                                                                                          |
| -------------------- | ------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| LK/20022026/0007/1   | 2026-02-20T15:13:30 | LAPORAN KEPEMILIKAN ATAU SETIAP PERUBAHAN KEPEMILIKAN SAHAM PERUSAHAAN TERBUKA | [{"filename":"LK-20022026-8180-00.pdf-0","url":"\\StaticData\\NewsAndAnnouncement\\ANNOUNCEMENTST... |
| AAI/007/II-26/corsec | 2026-02-09T19:05:01 | Laporan Bulanan Registrasi Pemegang Efek                                       | [{"filename":"0b64c21d78_cc4aa93471.pdf","url":"\\StaticData\\NewsAndAnnouncement\\ANNOUNCEMENTST... |
| AAI/004/I-26/corsec  | 2026-01-15T18:42:06 | Laporan Penggunaan Dana Hasil Penawaran Umum                                   | [{"filename":"7e2b4fee74_ec3f1b3b03.pdf","url":"\\StaticData\\NewsAndAnnouncement\\ANNOUNCEMENTST... |

## `right_offering`

### Columns

| Name             | Type      | PK  |
| ---------------- | --------- | --- |
| `id`             | `TEXT`    | ✅  |
| `code`           | `TEXT`    | -   |
| `name`           | `TEXT`    | -   |
| `ratio`          | `TEXT`    | -   |
| `exercise_price` | `REAL`    | -   |
| `fund_raised`    | `REAL`    | -   |
| `exercise_date`  | `INTEGER` | -   |
| `recording_date` | `INTEGER` | -   |
| `trading_period` | `TEXT`    | -   |
| `period`         | `INTEGER` | -   |

### Data Sample

| id                 | code | name                               | ratio | exercise_price | fund_raised  | exercise_date | recording_date | trading_period       | period        |
| ------------------ | ---- | ---------------------------------- | ----- | -------------- | ------------ | ------------- | -------------- | -------------------- | ------------- |
| INET-1768348800000 | INET | PT Sinergi Inti Andalan Prima Tbk. | 5:102 | 100.0          | 3258693.9356 | 1768176000000 | 1768348800000  | 15 – 22 January 2026 | 1767200400000 |
| BUVA-1761696000000 | BUVA | Bukit Uluwatu Villa Tbk            | 1:1   | 150.0          | 603987.21435 | 1761609600000 | 1761696000000  | -                    | 1759251600000 |
| COCO-1759968000000 | COCO | Wahana Interfood Nusantara Tbk     | 1:3   | 0.0            | 0.0          | 1759881600000 | 1759968000000  | -                    | 1759251600000 |

## `sectoral_movement`

### Columns

| Name     | Type      | PK  |
| -------- | --------- | --- |
| `id`     | `TEXT`    | ✅  |
| `name`   | `TEXT`    | -   |
| `date`   | `INTEGER` | -   |
| `change` | `REAL`    | -   |
| `period` | `INTEGER` | -   |

### Data Sample

| id                            | name            | date          | change            | period        |
| ----------------------------- | --------------- | ------------- | ----------------- | ------------- |
| Composite Index-1738281600000 | Composite Index | 1738281600000 | 0.0               | 1767200400000 |
| Composite Index-1738540800000 | Composite Index | 1738540800000 | -1.11320542395769 | 1767200400000 |
| Composite Index-1738627200000 | Composite Index | 1738627200000 | -0.50272885838069 | 1767200400000 |

## `security_stock`

### Columns

| Name            | Type      | PK  |
| --------------- | --------- | --- |
| `code`          | `TEXT`    | ✅  |
| `name`          | `TEXT`    | -   |
| `shares`        | `INTEGER` | -   |
| `listing_board` | `TEXT`    | -   |
| `listing_date`  | `INTEGER` | -   |

### Data Sample

| code | name                         | shares     | listing_board     | listing_date |
| ---- | ---------------------------- | ---------- | ----------------- | ------------ |
| AALI | Astra Agro Lestari Tbk.      | 1924688333 | Utama             | 881600400    |
| ABBA | Mahaka Media Tbk.            | 3935892857 | Pemantauan Khusus | 1017766800   |
| ABDA | Asuransi Bina Dana Arta Tbk. | 620806680  | Pemantauan Khusus | 615661200    |

## `stock_screener`

### Columns

| Name                | Type   | PK  |
| ------------------- | ------ | --- |
| `code`              | `TEXT` | ✅  |
| `name`              | `TEXT` | -   |
| `industry`          | `TEXT` | -   |
| `sector`            | `TEXT` | -   |
| `sub_sector`        | `TEXT` | -   |
| `sub_industry`      | `TEXT` | -   |
| `sub_industry_code` | `TEXT` | -   |
| `market_capital`    | `REAL` | -   |
| `total_revenue`     | `REAL` | -   |
| `npm`               | `REAL` | -   |
| `per`               | `REAL` | -   |
| `pbv`               | `REAL` | -   |
| `roa`               | `REAL` | -   |
| `roe`               | `REAL` | -   |
| `der`               | `REAL` | -   |
| `week4`             | `REAL` | -   |
| `week13`            | `REAL` | -   |
| `week26`            | `REAL` | -   |
| `week52`            | `REAL` | -   |
| `ytd`               | `REAL` | -   |
| `mtd`               | `REAL` | -   |
| `uma_date`          | `TEXT` | -   |
| `notation`          | `TEXT` | -   |
| `status`            | `TEXT` | -   |
| `corp_action`       | `TEXT` | -   |
| `corp_action_date`  | `TEXT` | -   |

### Data Sample

| code | name                           | industry              | sector                 | sub_sector            | sub_industry        | sub_industry_code | market_capital   | total_revenue    | npm   | per    | pbv   | roa   | roe   | der   | week4             | week13            | week26           | week52           | ytd               | mtd              | uma_date            | notation | status | corp_action | corp_action_date    |
| ---- | ------------------------------ | --------------------- | ---------------------- | --------------------- | ------------------- | ----------------- | ---------------- | ---------------- | ----- | ------ | ----- | ----- | ----- | ----- | ----------------- | ----------------- | ---------------- | ---------------- | ----------------- | ---------------- | ------------------- | -------- | ------ | ----------- | ------------------- |
| AADI | PT Adaro Andalan Indonesia Tbk | Coal                  | Energy                 | Oil, Gas & Coal       | Coal Production     | A121              | 59180377376000.0 | 60243564576000.0 | 21.74 | 4.52   | 0.93  | 12.84 | 20.69 | 0.61  | 19.7492163009404  | 23.6245954692557  | 39.4160583941606 | 24.8366013071895 | 35.4609929078014  | 18.266253869969  |                     |          |        | ipo         | 2024-12-05T00:00:00 |
| AALI | Astra Agro Lestari Tbk         | Agricultural Products | Consumer Non-Cyclicals | Food & Beverage       | Plantations & Crops | D232              | 14242693664200.0 | 22118716000000.0 | 6.4   | 10.05  | 0.6   | 5.07  | 5.98  | 0.18  | 0.657894736842105 | -2.85714285714286 | 4.08163265306122 | 28.5714285714286 | 3.72881355932203  | 5.15463917525773 |                     |          |        |             |                     |
| ABBA | Mahaka Media Tbk               | Media                 | Consumer Cyclicals     | Media & Entertainment | Consumer Publishing | E614              | 200730535707.0   | 126929045731.0   | -4.49 | -35.23 | -2.35 | -2.12 | 0.0   | -4.15 | -9.09090909090909 | -13.7931034482759 | 31.5789473684211 | 138.095238095238 | -15.2542372881356 | 0.0              | 2025-10-08T00:00:00 | E,X      |        |             |                     |

## `stock_split`

### Columns

| Name                | Type      | PK  |
| ------------------- | --------- | --- |
| `id`                | `TEXT`    | ✅  |
| `code`              | `TEXT`    | -   |
| `name`              | `TEXT`    | -   |
| `type`              | `TEXT`    | -   |
| `ratio`             | `TEXT`    | -   |
| `old_nominal`       | `REAL`    | -   |
| `new_nominal`       | `REAL`    | -   |
| `additional_shares` | `INTEGER` | -   |
| `listed_shares`     | `INTEGER` | -   |
| `listing_date`      | `INTEGER` | -   |
| `period`            | `INTEGER` | -   |

### Data Sample

| id                 | code | name                          | type | ratio  | old_nominal | new_nominal | additional_shares | listed_shares | listing_date  | period        |
| ------------------ | ---- | ----------------------------- | ---- | ------ | ----------- | ----------- | ----------------- | ------------- | ------------- | ------------- |
| CUAN-1752537600000 | CUAN | PT Petrindo Jaya Kreasi Tbk   | SS   | 1 : 10 | 200.0       | 20.0        | 101177010000      | 112418900000  | 1752537600000 | 1751302800000 |
| FISH-1757376000000 | FISH | FKS Multi Agro Tbk            | SS   | 1 : 10 | 100.0       | 10.0        | 4320000000        | 4800000000    | 1757376000000 | 1756659600000 |
| BUAH-1761091200000 | BUAH | PT Segar Kumala Indonesia Tbk | SS   | 1:2    | 50.0        | 25.0        | 1000000000        | 2000000000    | 1761091200000 | 1759251600000 |

## `stock_summary`

### Columns

| Name                    | Type      | PK  |
| ----------------------- | --------- | --- |
| `id`                    | `INTEGER` | ✅  |
| `code`                  | `TEXT`    | -   |
| `name`                  | `TEXT`    | -   |
| `date`                  | `INTEGER` | -   |
| `remarks`               | `TEXT`    | -   |
| `open`                  | `REAL`    | -   |
| `high`                  | `REAL`    | -   |
| `low`                   | `REAL`    | -   |
| `close`                 | `REAL`    | -   |
| `previous`              | `REAL`    | -   |
| `change`                | `REAL`    | -   |
| `volume`                | `INTEGER` | -   |
| `value`                 | `REAL`    | -   |
| `frequency`             | `INTEGER` | -   |
| `first_trade`           | `REAL`    | -   |
| `bid`                   | `REAL`    | -   |
| `bid_volume`            | `INTEGER` | -   |
| `offer`                 | `REAL`    | -   |
| `offer_volume`          | `INTEGER` | -   |
| `foreign_buy`           | `INTEGER` | -   |
| `foreign_sell`          | `INTEGER` | -   |
| `foreign_net`           | `INTEGER` | -   |
| `listed_shares`         | `INTEGER` | -   |
| `tradable_shares`       | `INTEGER` | -   |
| `weight_for_index`      | `REAL`    | -   |
| `individual_index`      | `REAL`    | -   |
| `non_regular_volume`    | `INTEGER` | -   |
| `non_regular_value`     | `REAL`    | -   |
| `non_regular_frequency` | `INTEGER` | -   |

### Data Sample

| id      | code | name                         | date          | remarks                        | open | high   | low    | close  | previous | change | volume  | value        | frequency | first_trade | bid    | bid_volume | offer  | offer_volume | foreign_buy | foreign_sell | foreign_net | listed_shares | tradable_shares | weight_for_index | individual_index | non_regular_volume | non_regular_value | non_regular_frequency |
| ------- | ---- | ---------------------------- | ------------- | ------------------------------ | ---- | ------ | ------ | ------ | -------- | ------ | ------- | ------------ | --------- | ----------- | ------ | ---------- | ------ | ------------ | ----------- | ------------ | ----------- | ------------- | --------------- | ---------------- | ---------------- | ------------------ | ----------------- | --------------------- |
| 3466840 | AALI | Astra Agro Lestari Tbk.      | 1704128400000 | --S-18AE106000D232------------ | 0.0  | 7150.0 | 7025.0 | 7100.0 | 7025.0   | 75.0   | 714000  | 5072157500.0 | 725       | 0.0         | 7075.0 | 54100      | 7100.0 | 2300         | 266300      | 364800       | -98500      | 1924688333    | 1924688333      | 390711732.0      | 576.8            | 0                  | 0.0               | 0                     |
| 3466841 | ABBA | Mahaka Media Tbk.            | 1704128400000 | --U-4100000000E614-E---------X | 0.0  | 54.0   | 52.0   | 52.0   | 52.0     | 0.0    | 2353800 | 124964600.0  | 199       | 0.0         | 52.0   | 3981200    | 54.0   | 2972200      | 0           | 0            | 0           | 3935892857    | 3935892857      | 1342139464.0     | 114.9            | 0                  | 0.0               | 0                     |
| 3466842 | ABDA | Asuransi Bina Dana Arta Tbk. | 1704128400000 | --U-4105000000G412-----------X | 0.0  | 0.0    | 0.0    | 5800.0 | 5800.0   | 0.0    | 0       | 0.0          | 0         | 0.0         | 0.0    | 0          | 5700.0 | 70000        | 0           | 0            | 0           | 620806680     | 620806680       | 31474899.0       | 1324.1           | 0                  | 0.0               | 0                     |

## `top_gainer`

### Columns

| Name          | Type      | PK  |
| ------------- | --------- | --- |
| `id`          | `TEXT`    | ✅  |
| `code`        | `TEXT`    | -   |
| `name`        | `TEXT`    | -   |
| `previous`    | `REAL`    | -   |
| `previous_ca` | `REAL`    | -   |
| `close`       | `REAL`    | -   |
| `dilution`    | `REAL`    | -   |
| `change`      | `REAL`    | -   |
| `percentage`  | `REAL`    | -   |
| `period`      | `INTEGER` | -   |

### Data Sample

| id                 | code | name                         | previous | previous_ca | close  | dilution | change | percentage       | period        |
| ------------------ | ---- | ---------------------------- | -------- | ----------- | ------ | -------- | ------ | ---------------- | ------------- |
| RLCO-1767200400000 | RLCO | Abadi Lestari Indonesia Tbk. | 1765.0   | 1765.0      | 7850.0 | 1.0      | 6085.0 | 344.759206798867 | 1767200400000 |
| TIRT-1767200400000 | TIRT | Tirta Mahakam Resources Tbk  | 127.0    | 127.0       | 466.0  | 1.0      | 339.0  | 266.929133858268 | 1767200400000 |
| INDS-1767200400000 | INDS | Indospring Tbk               | 226.0    | 226.0       | 745.0  | 1.0      | 519.0  | 229.646017699115 | 1767200400000 |

## `top_loser`

### Columns

| Name          | Type      | PK  |
| ------------- | --------- | --- |
| `id`          | `TEXT`    | ✅  |
| `code`        | `TEXT`    | -   |
| `name`        | `TEXT`    | -   |
| `previous`    | `REAL`    | -   |
| `previous_ca` | `REAL`    | -   |
| `close`       | `REAL`    | -   |
| `dilution`    | `REAL`    | -   |
| `change`      | `REAL`    | -   |
| `percentage`  | `REAL`    | -   |
| `period`      | `INTEGER` | -   |

### Data Sample

| id                 | code | name                            | previous | previous_ca | close | dilution | change | percentage        | period        |
| ------------------ | ---- | ------------------------------- | -------- | ----------- | ----- | -------- | ------ | ----------------- | ------------- |
| KIOS-1767200400000 | KIOS | Kioson Komersial Indonesia Tbk  | 266.0    | 266.0       | 131.0 | 1.0      | -135.0 | -50.7518796992481 | 1767200400000 |
| INET-1767200400000 | INET | Sinergi Inti Andalan Prima Tbk. | 760.0    | 760.0       | 376.0 | 1.0      | -384.0 | -50.5263157894737 | 1767200400000 |
| IBFN-1767200400000 | IBFN | Intan Baruprana Finance Tbk     | 242.0    | 242.0       | 122.0 | 1.0      | -120.0 | -49.5867768595041 | 1767200400000 |

## `trade_summary`

### Columns

| Name        | Type      | PK  |
| ----------- | --------- | --- |
| `id`        | `TEXT`    | ✅  |
| `volume`    | `INTEGER` | -   |
| `value`     | `REAL`    | -   |
| `frequency` | `INTEGER` | -   |
| `date`      | `INTEGER` | ✅  |

### Data Sample

| id    | volume      | value            | frequency | date          |
| ----- | ----------- | ---------------- | --------- | ------------- |
| DIRE  | 32900       | 2648800.0        | 25        | 1771520400000 |
| ETF   | 793400      | 456443000.0      | 165       | 1771520400000 |
| Saham | 43123174021 | 20322014227790.0 | 2839333   | 1771520400000 |

## `trading_daily`

### Columns

| Name               | Type      | PK  |
| ------------------ | --------- | --- |
| `id`               | `INTEGER` | ✅  |
| `code`             | `TEXT`    | -   |
| `board`            | `TEXT`    | -   |
| `previous`         | `REAL`    | -   |
| `open`             | `REAL`    | -   |
| `high`             | `REAL`    | -   |
| `low`              | `REAL`    | -   |
| `close`            | `REAL`    | -   |
| `change`           | `REAL`    | -   |
| `volume`           | `INTEGER` | -   |
| `value`            | `REAL`    | -   |
| `frequency`        | `INTEGER` | -   |
| `bid`              | `REAL`    | -   |
| `bid_volume`       | `INTEGER` | -   |
| `offer`            | `REAL`    | -   |
| `offer_volume`     | `INTEGER` | -   |
| `individual_index` | `REAL`    | -   |
| `foreign_shares`   | `REAL`    | -   |
| `updated_at`       | `TEXT`    | -   |

### Data Sample

| id       | code | board | previous | open   | high   | low    | close  | change | volume  | value       | frequency | bid    | bid_volume | offer  | offer_volume | individual_index | foreign_shares | updated_at          |
| -------- | ---- | ----- | -------- | ------ | ------ | ------ | ------ | ------ | ------- | ----------- | --------- | ------ | ---------- | ------ | ------------ | ---------------- | -------------- | ------------------- |
| 17400695 | ABDA | RG    | 2680.0   | 2680.0 | 2680.0 | 2680.0 | 2680.0 | 0.0    | 2300    | 6164000.0   | 12        | 2680.0 | 200        | 2940.0 | 5200         | 611.8456         | 620806680.0    | 2026-02-20T16:03:50 |
| 17430562 | ABBA | RG    | 50.0     | 50.0   | 50.0   | 50.0   | 50.0   | 0.0    | 599500  | 29975000.0  | 97        | 50.0   | 1333900    | 52.0   | 106000       | 110.4606         | 3935892857.0   | 2026-02-20T16:06:58 |
| 17481436 | ACST | RG    | 129.0    | 128.0  | 130.0  | 126.0  | 129.0  | 0.0    | 2380100 | 304122600.0 | 382       | 128.0  | 1200       | 129.0  | 25000        | 9.5269           | 17675160000.0  | 2026-02-20T16:18:27 |

## `trading_ss`

### Columns

| Name               | Type      | PK  |
| ------------------ | --------- | --- |
| `id`               | `INTEGER` | ✅  |
| `no`               | `INTEGER` | -   |
| `code`             | `TEXT`    | -   |
| `name`             | `TEXT`    | -   |
| `date`             | `TEXT`    | -   |
| `previous`         | `REAL`    | -   |
| `open`             | `REAL`    | -   |
| `high`             | `REAL`    | -   |
| `low`              | `REAL`    | -   |
| `close`            | `REAL`    | -   |
| `change`           | `REAL`    | -   |
| `volume`           | `INTEGER` | -   |
| `value`            | `REAL`    | -   |
| `frequency`        | `INTEGER` | -   |
| `first_trade`      | `REAL`    | -   |
| `bid`              | `REAL`    | -   |
| `bid_volume`       | `INTEGER` | -   |
| `offer`            | `REAL`    | -   |
| `offer_volume`     | `INTEGER` | -   |
| `listed_shares`    | `INTEGER` | -   |
| `tradable_shares`  | `INTEGER` | -   |
| `weight_for_index` | `REAL`    | -   |
| `individual_index` | `REAL`    | -   |

### Data Sample

| id      | no  | code | name                         | date                | previous | open | high   | low    | close  | change | volume   | value        | frequency | first_trade | bid    | bid_volume | offer  | offer_volume | listed_shares | tradable_shares | weight_for_index | individual_index |
| ------- | --- | ---- | ---------------------------- | ------------------- | -------- | ---- | ------ | ------ | ------ | ------ | -------- | ------------ | --------- | ----------- | ------ | ---------- | ------ | ------------ | ------------- | --------------- | ---------------- | ---------------- |
| 3043735 | 1   | AALI | Astra Agro Lestari Tbk.      | 2021-12-20T00:00:00 | 9825.0   | 0.0  | 9825.0 | 9525.0 | 9550.0 | -275.0 | 974800   | 9407295000.0 | 902       | 0.0         | 9550.0 | 68100      | 9575.0 | 46000        | 1924688333    | 1924688333      | 1464495353.0     | 775.8            |
| 3043736 | 1   | ABBA | Mahaka Media Tbk.            | 2021-12-20T00:00:00 | 408.0    | 0.0  | 414.0  | 382.0  | 392.0  | -16.0  | 13458500 | 5361211000.0 | 1851      | 0.0         | 390.0  | 81900      | 392.0  | 51600        | 2755125000    | 2755125000      | 2139630075.0     | 687.7            |
| 3043737 | 1   | ABDA | Asuransi Bina Dana Arta Tbk. | 2021-12-20T00:00:00 | 6200.0   | 0.0  | 5950.0 | 5800.0 | 5950.0 | -250.0 | 200      | 1175000.0    | 2         | 0.0         | 5950.0 | 1500       | 6750.0 | 100          | 620806680     | 620806680       | 504405428.0      | 1358.4           |
