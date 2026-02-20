# IDX-API Sample Database Reference

Overview of the dataset included in `sample-database.sqlite`.

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

| id                 | code | name                            | volume     | value          | frequency | volume_percent     | value_percent      | frequency_percent  | trading_days | period     |
| ------------------ | ---- | ------------------------------- | ---------- | -------------- | --------- | ------------------ | ------------------ | ------------------ | ------------ | ---------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk              | 391669105  | 75148235928216 | 5337295   | 15.920263656553775 | 10.762971108983674 | 6.99178114851703   | 20           | 1968841344 |
| DEWA-1767200400000 | DEWA | Darma Henwa Tbk                 | 1139383215 | 21903437559535 | 1957373   | 2.5094865127485093 | 3.1370805013426435 | 2.564131014308976  | 20           | 1968841344 |
| INET-1767200400000 | INET | Sinergi Inti Andalan Prima Tbk. | 937064474  | 9287358767275  | 1592148   | 1.4569919200166053 | 1.3301652774182435 | 2.0856914171034378 | 20           | 1968841344 |

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

| id                 | code | name                   | volume     | value          | frequency | volume_percent     | value_percent      | frequency_percent  | trading_days | period     |
| ------------------ | ---- | ---------------------- | ---------- | -------------- | --------- | ------------------ | ------------------ | ------------------ | ------------ | ---------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk     | 391669105  | 75148235928216 | 5337295   | 15.920263656553775 | 10.762971108983674 | 6.99178114851703   | 20           | 1968841344 |
| BBCA-1767200400000 | BBCA | Bank Central Asia Tbk. | 1635327469 | 43956252932828 | 1327772   | 0.4769235080852871 | 6.295555371747207  | 1.7393625870649374 | 20           | 1968841344 |
| ANTM-1767200400000 | ANTM | Aneka Tambang Tbk      | 2030048964 | 25680051985721 | 1498326   | 0.5086676232721262 | 3.67797931894947   | 1.962785920795633  | 20           | 1968841344 |

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

| id                 | code | name                      | volume     | value          | frequency | volume_percent     | value_percent      | frequency_percent  | trading_days | period     |
| ------------------ | ---- | ------------------------- | ---------- | -------------- | --------- | ------------------ | ------------------ | ------------------ | ------------ | ---------- |
| BUMI-1767200400000 | BUMI | Bumi Resources Tbk        | 391669105  | 75148235928216 | 5337295   | 15.920263656553775 | 10.762971108983674 | 6.99178114851703   | 20           | 1968841344 |
| GOTO-1767200400000 | GOTO | GoTo Gojek Tokopedia Tbk. | -316724905 | 9622448193024  | 678545    | 12.063806223703942 | 1.3781578585309595 | 0.8888843767152628 | 20           | 1968841344 |
| BKSL-1767200400000 | BKSL | Sentul City Tbk           | 1542234032 | 6954662609717  | 1235880   | 3.5781082062333125 | 0.9960690602586453 | 1.6189853635276348 | 20           | 1968841344 |

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

| id                 | code | name                              | shares    | type    | start_date | last_date  | period     |
| ------------------ | ---- | --------------------------------- | --------- | ------- | ---------- | ---------- | ---------- |
| ACRO-1767312000000 | ACRO | PT Samcro Hyosung Adilestari Tbk. | 1090      | Warrant | 2080441344 | 2080441344 | 1968841344 |
| BAIK-1769385600000 | BAIK | PT Bersama Mencapai Puncak Tbk.   | 2014      | Warrant | -140925952 | 118274048  | 1968841344 |
| BANK-1769385600000 | BANK | PT Bank Net Indonesia Syariah Tbk | 122231662 | Warrant | -140925952 | 204674048  | 1968841344 |

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

| id     | date       | broker_code | broker_name                 | total_value | volume   | frequency |
| ------ | ---------- | ----------- | --------------------------- | ----------- | -------- | --------- |
| 902895 | -973616512 | AF          | Harita Kencana Sekuritas    | 1959134300  | 2582300  | 200       |
| 902896 | -973616512 | AG          | Kiwoom Sekuritas Indonesia  | 92360261300 | 99599600 | 12270     |
| 902897 | -973616512 | AH          | Shinhan Sekuritas Indonesia | 15199874700 | 35798900 | 1489      |

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

| id                                          | number                 | date       | title                                                            | type  | company_code | created_date | form_id | subject                        | is_stock | is_bond | attachments                                                                                             |
| ------------------------------------------- | ---------------------- | ---------- | ---------------------------------------------------------------- | ----- | ------------ | ------------ | ------- | ------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| 20240101230334-25/122023/FS-HSS/ABFII_id-id | 25/122023/FS-HSS/ABFII | -977002512 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | -976994512   | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"fb3260d796_2bdf042dce.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncement... |
| 20240101224724-24/122023/FS-HSS/ABFII_id-id | 24/122023/FS-HSS/ABFII | -977972512 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | -977966512   | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"580cb4be41_4a79f3043a.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncement... |
| 20240101224458-23/122023/FS-HSS/ABFII_id-id | 23/122023/FS-HSS/ABFII | -978118512 | Laporan Harian atas Nilai Aktiva Bersih dan Komposisi Portofolio | STOCK | R-ABFII      | -978105512   | 00010   | Laporan Harian atas Nilai Akti | 0        | 0       | [{"filename":"672f56cf10_baf755af6c.pdf","url":"https://www.idx.co.id/StaticData/NewsAndAnnouncement... |

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

> No data recorded.

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

| code | address                                                                                                 | bae                       | industry                 | sub_industry                | email                     | fax                          | business_activity                                                                                       | phone           | website                     | npwp                  | history | board             | sector                     | sub_sector              | status | secretary                                                                                  | directors                                                                                               | commissioners                                                                                           | committees | shareholders                                                                                            | subsidiaries                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------ | --------------------------- | ------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- | --------------- | --------------------------- | --------------------- | ------- | ----------------- | -------------------------- | ----------------------- | ------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| AADI | Cyber 2 Tower Lantai 26<br>Jl. H.R. Rasuna Said Blok X-5, No.13<br>Jakarta 12950 - Indonesia            | PT. Datindo Entrycom      | Batu Bara                | Produksi Batu Bara          | corsec@adaroindonesia.com | (021) 2553 3066              | Perkebunan kelapa sawit, karet dan tanaman penghasil getah lain, perusahaan holding, dan konsultasi ... | (021) 2553 3065 | www.adaroindonesia.com      | 02.433.115.9-091.000  | `null`  | Utama             | Energi                     | Minyak, Gas & Batu Bara | 0.0    | [{"name":"Ray Aryaputra","email":"corsec@adaroindonesia.com","phone":"(021) 2553 3065"}]   | [{"name":"Julius Aslan","position":"DIREKTUR UTAMA"},{"name":"Priyadi","position":"DIREKTUR"},{"name... | [{"name":"Budi Bowoleksono","position":"KOMISARIS UTAMA"},{"name":"Primus Dorimulu","position":"KOMI... | []         | [{"name":"Budi Bowoleksono","count":0,"percentage":0},{"name":"Primus Dorimulu","count":8500,"percen... | [{"name":"Adaro Australia Pty Ltd","location":"Australia","percentage":90,"unit":"RIBUAN"},{"name":"... |
| AALI | Jl. Puloayang Raya Kawasan Industri Pulo Gadung, OR, 1, Jatinegara, Cakung, Kota ADM, Jakarta Timur,... | PT. Raya Saham Registra   | Produk Makanan Pertanian | Perkebunan & Tanaman Pangan | Investor@astra-agro.co.id | 461-6655, 461-6677, 461-6688 | Agriculture Plantation                                                                                  | 461-65-55       | http://www.astra-agro.co.id | 001.334.427.0-054.000 | `null`  | Utama             | Barang Konsumen Primer     | Makanan & Minuman       | 0.0    | [{"name":"Tingning Sukowignjo","email":"investor@astra-agro.co.id","phone":"021-4616555"}] | [{"name":"DJAP TET FA","position":"PRESIDEN DIREKTUR"},{"name":"EKO PRASETYO","position":"DIREKTUR"}... | [{"name":"SANTOSA","position":"PRESIDEN KOMISARIS"},{"name":"JOHANNES LOMAN","position":"KOMISARIS"}... | []         | [{"name":"PT Astra International Tbk","count":340510927,"percentage":17.69},{"name":"PT Astra Intern... | [{"name":"PT Agro Menara Rachmat ","location":"Kalimantan Tengah","percentage":99.99,"unit":"JUTAAN"... |
| ABBA | Sahid Sudirman Centre Lt. 10, Jl. Jend. Sudirman No. 86, Jakarta 10220                                  | PT. Adimitra Jasa Korpora | Media                    | Penerbitan                  | corsec@mahakax.com        | (021) 573 9210               | Media dan Percetakan                                                                                    | (021) 573 9203  | www.mahakax.com             | 01.609.052.4-054.000  | `null`  | Pemantauan Khusus | Barang Konsumen Non-Primer | Media & Hiburan         | 0.0    | [{"name":"S. Pramudityo Anggoro","email":"corsec@mahakamedia.com","phone":"021-5739203"}]  | [{"name":"Ronny Wilimas Sugiadha","position":"DIREKTUR UTAMA"},{"name":"Muhammad Fadri Attamimi","po... | [{"name":"Martin Suharlie","position":"KOMISARIS"},{"name":"Aldo Rambie","position":"KOMISARIS UTAMA... | []         | [{"name":"PT Beyond Media","count":1592831618,"percentage":40.47},{"name":"PT Solic Kreasi Baru","co... | [{"name":"PT AKASIA CEPAT INDONESIA","location":"JAKARTA","percentage":50,"unit":"PENUH"},{"name":"P... |

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

| id                 | code | name                          | cash_dividend | cum_dividend | ex_dividend | record_date | payment_date | period     |
| ------------------ | ---- | ----------------------------- | ------------- | ------------ | ----------- | ----------- | ------------ | ---------- |
| RAJA-1768176000000 | RAJA | Rukun Raharja Tbk             | 25            | -1696125952  | -1609725952 | -1350525952 | 31874048     | 1968841344 |
| BSSR-1767657600000 | BSSR | Baramulti Suksessarana Tbk    | 127.41448     | 2080441344   | -1955325952 | -1868925952 | -1091325952  | 1968841344 |
| CDIA-1768262400000 | CDIA | PT Chandra Daya Investasi Tbk | 1.34          | -1609725952  | -1350525952 | -1264125952 | 118274048    | 1968841344 |

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

| code | name                             | listing_date |
| ---- | -------------------------------- | ------------ |
| SUPA | PT Super Bank Indonesia Tbk      | 672841344    |
| RLCO | PT Abadi Lestari Indonesia Tbk   | -104758656   |
| PJHB | PT Pelayaran Jaya Hidup Baru Tbk | 1425408640   |

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

| id                    | code    | title                                                                            | date       | type      | download_url                                                                                            |
| --------------------- | ------- | -------------------------------------------------------------------------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------------- |
| HOMI-1771577821000    | HOMI    | Pembukaan Penghentian Sementara Perdagangan Efek PT Grand House Mulia Tbk (HOMI) | 2051295048 | Unsuspend | /StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/From_EREP/202602/69d277401c_c1242d64ee.pdf            |
| >1 Kode-1771552782000 | >1 Kode | Pembukaan Penghentian Sementara Perdagangan Efek (>1 Kode)                       | 2026256048 | Unsuspend | /StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/From_EREP/202602/cd907e072e_475281cb0d.pdf            |
| HILL-1771522200000    | HILL    | Pembukaan Kembali Perdagangan Saham PT Hillcon Tbk. (HILL)                       | 1995674048 | Unsuspend | /Portals/0/StaticData/NewsAndAnnouncement/ANNOUNCEMENTSTOCK/Exchange/2026/FEB/20260220-WAS_Unsuspens... |

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

| id                            | name            | close   | date        | period     |
| ----------------------------- | --------------- | ------- | ----------- | ---------- |
| Composite Index-1767312000000 | Composite Index | 8748.13 | 2080441344  | 1968841344 |
| Composite Index-1767571200000 | Composite Index | 8859.19 | -1955325952 | 1968841344 |
| Composite Index-1767657600000 | Composite Index | 8933.61 | -1868925952 | 1968841344 |

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

| date        | buy_volume | buy_value      | buy_frequency | sell_volume | sell_value     | sell_frequency | period     |
| ----------- | ---------- | -------------- | ------------- | ----------- | -------------- | -------------- | ---------- |
| 2080441344  | 1917157879 | 17081040966513 | 2652477       | -353834471  | 12427522085607 | 2279894        | 1968841344 |
| -1955325952 | 76793678   | 23300045388011 | 3368019       | -1593126312 | 18323360270828 | 2988110        | 1968841344 |
| -1868925952 | 1373381273 | 25679261838915 | 3661161       | 1585678525  | 19408704376430 | 3213652        | 1968841344 |

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

| id                 | code | name                           | sector | sub_sector      | industry | sub_industry    | period      | assets    | liabilities | equity   | sales    | ebt     | profit   | eps    | book_value | per   | pbv  | der  | roa     | roe     | npm     |
| ------------------ | ---- | ------------------------------ | ------ | --------------- | -------- | --------------- | ----------- | --------- | ----------- | -------- | -------- | ------- | -------- | ------ | ---------- | ----- | ---- | ---- | ------- | ------- | ------- |
| AADI-1759190400000 | AADI | PT Adaro Andalan Indonesia Tbk | Energy | Oil, Gas & Coal | Coal     | Coal Production | -1746191360 | 102020.24 | 38712.12    | 63308.12 | 60243.56 | 13563.2 | 10931.07 | 1681.8 | 8130.09    | 4.52  | 0.93 | 0.61 | 12.8367 | 20.6861 | 21.7384 |
| ABMM-1759190400000 | ABMM | ABM Investama Tbk              | Energy | Oil, Gas & Coal | Coal     | Coal Production | -1746191360 | 34703.03  | 20260.6     | 14442.43 | 13047.28 | 717.99  | 704.54   | 459.29 | 5245.76    | 6.27  | 0.55 | 1.4  | 3.6438  | 8.7555  | 9.6917  |
| ADMR-1759190400000 | ADMR | Adaro Minerals Indonesia Tbk   | Energy | Oil, Gas & Coal | Coal     | Coal Production | -1746191360 | 44246.46  | 16625.59    | 27620.87 | 11269.51 | 4253.5  | 3366.79  | 132.63 | 675.62     | 14.97 | 2.94 | 0.6  | 12.2546 | 19.6309 | 48.1142 |

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

| date        | buy_volume | buy_value     | buy_frequency | sell_volume | sell_value    | sell_frequency | period     |
| ----------- | ---------- | ------------- | ------------- | ----------- | ------------- | -------------- | ---------- |
| 2080441344  | -330133082 | 5073641285159 | 424292        | 2127777683  | 1482658789446 | 59938          | 1968841344 |
| -1955325952 | -480518506 | 6953931233010 | 599736        | -1651118793 | 2016126070123 | 88521          | 1968841344 |
| -1868925952 | 115069768  | 8365537343435 | 658573        | -2114415385 | 2686057341997 | 97715          | 1968841344 |

## `index_chart`

### Columns

| Name    | Type      | PK  |
| ------- | --------- | --- |
| `id`    | `TEXT`    | ✅  |
| `code`  | `TEXT`    | -   |
| `date`  | `INTEGER` | -   |
| `value` | `REAL`    | -   |

### Data Sample

| id                      | code      | date      | value    |
| ----------------------- | --------- | --------- | -------- |
| COMPOSITE-1740096000000 | COMPOSITE | 634245120 | 6803.001 |
| COMPOSITE-1740355200000 | COMPOSITE | 893445120 | 6749.601 |
| COMPOSITE-1740441600000 | COMPOSITE | 979845120 | 6587.087 |

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

| id     | code      | name      | date       | previous | high     | low      | close    | change | percent | volume      | value         | frequency | market_cap        |
| ------ | --------- | --------- | ---------- | -------- | -------- | -------- | -------- | ------ | ------- | ----------- | ------------- | --------- | ----------------- |
| 165976 | COMPOSITE | COMPOSITE | -973616512 | 7272.797 | 7323.588 | 7245.566 | 7323.588 | 50.791 | 0.7     | 350886472   | 6783677461899 | 905619    | 11760665529744600 |
| 165977 | LQ45      | LQ45      | -973616512 | 970.568  | 979.433  | 966.474  | 979.433  | 8.865  | 0.91    | -1725081929 | 3586867554536 | 250577    | 5791413160796580  |
| 165978 | JII       | JII       | -973616512 | 535.678  | 545.384  | 534.653  | 545.384  | 9.706  | 1.81    | 1842199721  | 1805892008408 | 138226    | 2563419668097690  |

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

| id                                   | date      | industry               | members | shares     | market_cap    | volume       | value        | frequency | per   | pbv  | period     |
| ------------------------------------ | --------- | ---------------------- | ------- | ---------- | ------------- | ------------ | ------------ | --------- | ----- | ---- | ---------- |
| A. Energy-1769731200000              | 204674048 | A. Energy              | 91      | -719485891 | 2457973735.57 | 360827337.06 | 214100384.83 | 19441846  | 18.14 | 3.55 | 1968841344 |
| A1. Oil, Gas & Coal-1769731200000    | 204674048 | A1. Oil, Gas & Coal    | 89      | 195682563  | 2457698288.88 | 360626977.76 | 214073948.17 | 19423035  | 18.1  | 3.55 | 1968841344 |
| A2. Alternative Energy-1769731200000 | 204674048 | A2. Alternative Energy | 2       | -915168454 | 275446.69     | 200359.3     | 26436.66     | 18811     | 18.53 | 1.74 | 1968841344 |

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

| id     | code | type    | description                                                 | location                                                                                               | step    | date       | year |
| ------ | ---- | ------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------- | ---------- | ---- |
| 109872 | TGUK | Rencana | Pemberitahuan RUPS Rencana PT Platinum Wahab Nusantara Tbk. | Gedung Foresta Business Loft 5 no 25 Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 1... | rencana | -714416512 |      |
| 109912 | PYFA | Rencana | Pemberitahuan RUPS Rencana PT Pyridam Farma Tbk             | Sinarmas MSIG Tower, Lantai 12, Jl. Jend. Sudirman No. Kav, 21, Kuningan, Jakarta Selatan, Indonesia   | rencana | -800816512 |      |
| 109995 | YELO | Rencana | Pemberitahuan RUPS Rencana PT Yelooo Integra Datanet Tbk.   | Axa Tower LT. 42 JL. Prof DR. Satrio Kav 18 Karet Kuningan, Setiabudi, Jakarta Selatan 12940           | rencana | -455216512 |      |

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

> No data recorded.

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

| id                 | code | name                               | ratio | exercise_price | fund_raised  | exercise_date | recording_date | trading_period       | period     |
| ------------------ | ---- | ---------------------------------- | ----- | -------------- | ------------ | ------------- | -------------- | -------------------- | ---------- |
| INET-1768348800000 | INET | PT Sinergi Inti Andalan Prima Tbk. | 5:102 | 100            | 3258693.9356 | -1350525952   | -1177725952    | 15 – 22 January 2026 | 1968841344 |

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

| id                            | name            | date        | change              | period     |
| ----------------------------- | --------------- | ----------- | ------------------- | ---------- |
| Composite Index-1738281600000 | Composite Index | -1180154880 | 0                   | 1968841344 |
| Composite Index-1738540800000 | Composite Index | -920954880  | -1.1132054239576885 | 1968841344 |
| Composite Index-1738627200000 | Composite Index | -834554880  | -0.5027288583806898 | 1968841344 |

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
| ABBA | Mahaka Media Tbk.            | -359074439 | Pemantauan Khusus | 1017766800   |
| ABDA | Asuransi Bina Dana Arta Tbk. | 620806680  | Pemantauan Khusus | 615661200    |

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

> No data recorded.

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

| id      | code | name                         | date       | remarks                        | open | high | low  | close | previous | change | volume  | value      | frequency | first_trade | bid  | bid_volume | offer | offer_volume | foreign_buy | foreign_sell | foreign_net | listed_shares | tradable_shares | weight_for_index | individual_index | non_regular_volume | non_regular_value | non_regular_frequency |
| ------- | ---- | ---------------------------- | ---------- | ------------------------------ | ---- | ---- | ---- | ----- | -------- | ------ | ------- | ---------- | --------- | ----------- | ---- | ---------- | ----- | ------------ | ----------- | ------------ | ----------- | ------------- | --------------- | ---------------- | ---------------- | ------------------ | ----------------- | --------------------- |
| 3466840 | AALI | Astra Agro Lestari Tbk.      | -973616512 | --S-18AE106000D232------------ | 0    | 7150 | 7025 | 7100  | 7025     | 75     | 714000  | 5072157500 | 725       | 0           | 7075 | 54100      | 7100  | 2300         | 266300      | 364800       | -98500      | 1924688333    | 1924688333      | 390711732        | 576.8            | 0                  | 0                 | 0                     |
| 3466841 | ABBA | Mahaka Media Tbk.            | -973616512 | --U-4100000000E614-E---------X | 0    | 54   | 52   | 52    | 52       | 0      | 2353800 | 124964600  | 199       | 0           | 52   | 3981200    | 54    | 2972200      | 0           | 0            | 0           | -359074439    | -359074439      | 1342139464       | 114.9            | 0                  | 0                 | 0                     |
| 3466842 | ABDA | Asuransi Bina Dana Arta Tbk. | -973616512 | --U-4105000000G412-----------X | 0    | 0    | 0    | 5800  | 5800     | 0      | 0       | 0          | 0         | 0           | 0    | 0          | 5700  | 70000        | 0           | 0            | 0           | 620806680     | 620806680       | 31474899         | 1324.1           | 0                  | 0                 | 0                     |

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

| id                 | code | name                         | previous | previous_ca | close | dilution | change | percentage         | period     |
| ------------------ | ---- | ---------------------------- | -------- | ----------- | ----- | -------- | ------ | ------------------ | ---------- |
| RLCO-1767200400000 | RLCO | Abadi Lestari Indonesia Tbk. | 1765     | 1765        | 7850  | 1        | 6085   | 344.75920679886684 | 1968841344 |
| TIRT-1767200400000 | TIRT | Tirta Mahakam Resources Tbk  | 127      | 127         | 466   | 1        | 339    | 266.92913385826773 | 1968841344 |
| INDS-1767200400000 | INDS | Indospring Tbk               | 226      | 226         | 745   | 1        | 519    | 229.64601769911505 | 1968841344 |

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

| id                 | code | name                            | previous | previous_ca | close | dilution | change | percentage          | period     |
| ------------------ | ---- | ------------------------------- | -------- | ----------- | ----- | -------- | ------ | ------------------- | ---------- |
| KIOS-1767200400000 | KIOS | Kioson Komersial Indonesia Tbk  | 266      | 266         | 131   | 1        | -135   | -50.75187969924812  | 1968841344 |
| INET-1767200400000 | INET | Sinergi Inti Andalan Prima Tbk. | 760      | 760         | 376   | 1        | -384   | -50.526315789473685 | 1968841344 |
| IBFN-1767200400000 | IBFN | Intan Baruprana Finance Tbk     | 242      | 242         | 122   | 1        | -120   | -49.586776859504134 | 1968841344 |

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

| id    | volume    | value          | frequency | date       |
| ----- | --------- | -------------- | --------- | ---------- |
| DIRE  | 32900     | 2648800        | 25        | 1993874048 |
| ETF   | 793400    | 456443000      | 165       | 1993874048 |
| Saham | 173501061 | 20322014227790 | 2839333   | 1993874048 |
