import type * as Types from '@app/Statistics/Types.ts'
import BaseClient from '@app/Client.ts'

/**
 * Statistics data module.
 * @description Handles digital statistical data discovery from IDX.
 */
export default class StatisticModule extends BaseClient {
  /**
   * Discover statistical API links.
   * @description Maps features into a markdown summary table.
   * @param featureList - Features to process for discovery
   * @returns Markdown formatted output string
   */
  async discover(featureList: Types.DigitalFeatures[]): Promise<string> {
    await this.ensureSession()
    let markdownOutput = '# IDX Digital Statistic - API Direct Links\n\n'
    markdownOutput += '| Category | Feature Title | API Direct Link |\n'
    markdownOutput += '| :--- | :--- | :--- |\n'
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const queryParams = { year: currentYear, month: currentMonth, quarter: 0, type: 'monthly' }
    const base64Query = btoa(JSON.stringify(queryParams))
    const scrapingResults: string[] = []
    /**
     * Recursive sequential fetcher.
     * @description Processes items one by one with delay.
     * @param index - Current list item index
     * @returns Promise for completion status
     */
    const processSequentially = async (index: number): Promise<void> => {
      const featureItem = featureList[index]
      if (index >= featureList.length || !featureItem) {
        return
      }
      try {
        await fetch(featureItem.webUrl, {
          headers: { ...this.browserHeaders, Cookie: this.sessionCookie }
        }).then((r) => r.body?.cancel())
        await this.wait(500)
        const response = await fetch(featureItem.apiUrl, {
          headers: {
            ...this.browserHeaders,
            'X-Requested-With': 'XMLHttpRequest',
            Cookie: this.sessionCookie
          }
        })
        const apiResponseJson: Types.DigitalResponse = await response.json()
        let markdownRows = ''
        if (apiResponseJson.tableChartList?.value) {
          for (const dataItem of apiResponseJson.tableChartList.value) {
            const directLink =
              `https://www.idx.co.id/primary/DigitalStatistic/GetApiData?urlName=LINK_${dataItem.alias}&query=${base64Query}&isPrint=False&cumulative=false`
            const featureTitle = dataItem.title || featureItem.label
            markdownRows +=
              `| ${featureItem.label} | ${featureTitle} | [JSON Link](${directLink}) |\n`
            console.log(`   -> Discovered ${featureTitle} - ${directLink}`)
          }
        }
        scrapingResults.push(markdownRows)
      } catch {
        scrapingResults.push(`| ${featureItem.label} | Error | N/A |\n`)
      }
      await this.wait(300)
      return await processSequentially(index + 1)
    }
    await processSequentially(0)
    markdownOutput += scrapingResults.join('')
    return markdownOutput
  }

  /**
   * Persist discovery results.
   * @description Writes generated markdown to a physical file.
   * @param content - Markdown content to save
   * @param fileName - Target destination file path
   * @returns Promise for write completion
   */
  async saveOutput(content: string, fileName = 'Draft_Statistic_API.md'): Promise<void> {
    await Deno.writeTextFile(fileName, content)
    console.log(`[!] Finished! All links written to ${fileName}`)
  }
}
