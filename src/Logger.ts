/**
 * Global application logger.
 * @description Provides a centralized static logging interface.
 */
export default class Logger {
  /**
   * Log information message.
   * @param message - Main log content
   * @param data - Optional metadata or objects
   */
  static info(message: string, ...data: unknown[]): void {
    console.log(Logger.format('INFO', message), ...data)
  }

  /**
   * Log warning message.
   * @param message - Main log content
   * @param data - Optional metadata or objects
   */
  static warn(message: string, ...data: unknown[]): void {
    console.warn(Logger.format('WARN', message), ...data)
  }

  /**
   * Log error message.
   * @param message - Main log content
   * @param data - Optional metadata or objects
   */
  static error(message: string, ...data: unknown[]): void {
    console.error(Logger.format('ERROR', message), ...data)
  }

  /**
   * Log debug message.
   * @param message - Main log content
   * @param data - Optional metadata or objects
   */
  static debug(message: string, ...data: unknown[]): void {
    console.debug(Logger.format('DEBUG', message), ...data)
  }

  /**
   * Formats the log message with timestamp and level.
   * @param level - Log severity level
   * @param message - Original message
   * @returns Formatted string
   */
  private static format(level: string, message: string): string {
    const time = new Date().toISOString().replace('T', ' ').substring(0, 19)
    return `[${time}] [${level}] ${message}`
  }
}
