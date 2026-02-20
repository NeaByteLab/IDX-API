/**
 * Base client for API interaction.
 * @description Provides session management and browser emulation.
 */
export default class BaseClient {
  /** Standard browser headers for simulation */
  protected readonly browserHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    Referer: 'https://www.idx.co.id/',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
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
      const response = await this.fetcherUrl('https://www.idx.co.id/id')
      this.sessionCookie = response.headers.getSetCookie().join('; ')
      await this.wait(1000)
      await response.body?.cancel()
      const validationResponse = await this.fetcherUrl(
        'https://www.idx.co.id/primary/home/GetIndexList'
      )
      await validationResponse.body?.cancel()
    } catch (error) {
      throw error
    }
  }

  /**
   * Universal fetcher with exponential retry.
   * @description Handles network flakiness with automated retries.
   * @param url - Target endpoint URI
   * @param maxAttempts - Maximum execution retries
   * @returns Promise resolving to response object
   */
  async fetcherUrl(url: string, maxAttempts = 5): Promise<Response> {
    const headers = {
      ...this.browserHeaders,
      'X-Requested-With': 'XMLHttpRequest',
      ...(this.sessionCookie ? { Cookie: this.sessionCookie } : {})
    }
    const attemptFetch = async (attempt: number): Promise<Response> => {
      try {
        const response = await fetch(url, { headers })
        if (!response.ok && response.status >= 500) {
          await response.body?.cancel()
          throw new Error(`Server returned ${response.status}: ${response.statusText}`)
        }
        return response
      } catch (error) {
        if (attempt >= maxAttempts) {
          throw error
        }
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 15000)
        console.warn(
          `[Client] Fetch failed for ${url}. Retrying in ${
            delay / 1000
          }s (Attempt ${attempt}/${maxAttempts}). Error: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
        await this.wait(delay)
        return attemptFetch(attempt + 1)
      }
    }
    return await attemptFetch(1)
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
