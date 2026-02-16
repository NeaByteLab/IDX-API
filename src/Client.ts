/**
 * Base client for API interaction.
 * @description Provides session management and browser emulation.
 */
export default class BaseClient {
  /** Standard browser headers for simulation */
  protected readonly browserHeaders = {
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    Referer: 'https://www.idx.co.id/',
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8'
  }
  /** Cookies obtained from initialization */
  protected sessionCookie = ''

  /**
   * Initialize session cookie.
   * @description Fetches main page to obtain required cookies.
   * @returns Promise resolving when session is ready
   */
  async ensureSession(): Promise<void> {
    if (this.sessionCookie) {
      return
    }
    try {
      const response = await fetch('https://www.idx.co.id/id', {
        headers: this.browserHeaders
      })
      this.sessionCookie = response.headers.getSetCookie().join('; ')
      await this.wait(1000)
      await response.body?.cancel()
      await fetch('https://www.idx.co.id/primary/home/GetIndexList', {
        headers: {
          ...this.browserHeaders,
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: this.sessionCookie
        }
      }).then((r) => r.body?.cancel())
    } catch (error) {
      throw error
    }
  }

  /**
   * Helper for execution delay.
   * @description Pauses process for specified milliseconds.
   * @param ms - Delay duration in milliseconds
   * @returns Promise resolving after timeout
   */
  protected wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
