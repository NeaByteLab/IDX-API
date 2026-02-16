# Statistics Data Scraper

Extract latest data from IDX portal to update `data.json`.

### Steps:

1. **Open Page**: Go to [IDX Digital Statistic](https://www.idx.co.id/en/markets/statistical-reports/digital-statistic/).

2. **Open Console**: Press `F12`, then go to **Console** tab.

3. **Run Script**: Paste the code below into the console and press `Enter`.

   ```javascript
   ;(function () {
     const xpath = '/html/body/div[2]/div/div/div[2]/main/div/div[1]/div[2]/div[2]/div'
     try {
       const result = document.evaluate(
         xpath,
         document,
         null,
         XPathResult.FIRST_ORDERED_NODE_TYPE,
         null
       )
       const parent = result.singleNodeValue
       if (parent) {
         const divs = parent.querySelectorAll('div')
         divs.forEach((div) => div.classList.add('is-active'))
         const links = parent.querySelectorAll('a')
         const data = Array.from(links).map((a) => {
           const href = a.getAttribute('href') || ''
           const urlNameMatch = href.match(/urlName=([^&]+)/)
           return {
             label: a.innerText.trim(),
             urlName: urlNameMatch ? urlNameMatch[1] : 'N/A',
             url: href.startsWith('http') ? href : window.location.origin + href
           }
         })
         console.log('[!] Categories Activated & Data Extracted:')
         console.table(data)
       }
     } catch (e) {
       console.error('Extraction Error:', e.message)
     }
   })()
   ```

4. **Save Data**: Copy results into `src/Statistics/data.json`.
