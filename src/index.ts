import CompanyModule from '@app/Company/index.ts'
import MarketModule from '@app/Market/index.ts'
import StatisticModule from '@app/Statistics/index.ts'
import TradingModule from '@app/Trading/index.ts'

/**
 * Main execution for discover task.
 * @description Preserves existing functionality under new architecture.
 */
const runDiscovery = async () => {
  try {
    const dataPath = new URL('./Statistics/data.json', import.meta.url).pathname
    const jsonData = await Deno.readTextFile(dataPath)
    const features = JSON.parse(jsonData)
    const client = new IDXClient()
    const output = await client.statistics.discover(features)
    await client.statistics.saveOutput(output)
  } catch (error) {
    throw error
  }
}

/**
 * IDX API Facade.
 * @description Access point for IDX data modules.
 */
export default class IDXClient {
  /** Company and securities data */
  public readonly company: CompanyModule
  /** Market and calendar data */
  public readonly market: MarketModule
  /** Statistics and discovery features */
  public readonly statistics: StatisticModule
  /** Trading summaries and reports */
  public readonly trading: TradingModule

  /**
   * Initialize all domain modules.
   * @description Creates instances for core data services.
   */
  constructor() {
    this.company = new CompanyModule()
    this.market = new MarketModule()
    this.statistics = new StatisticModule()
    this.trading = new TradingModule()
  }
}

/**
 * Entry point for CLI execution.
 * @description Supports running scraper via deno task discover.
 */
if (import.meta.main) {
  runDiscovery()
}
