type Methods = "log" | "info" | "warn" | "error" | "debug"

export class Logger {
  private prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  private createLoggerMethod<T extends Methods>(method: T): Console[T] {
    return (...args: Parameters<Console[T]>): void => {
      const timestamp = new Date().toISOString()
      const singleLineArgs = args.map((arg) => {
        if (typeof arg === "object" && arg !== null) {
          return JSON.stringify(arg)
        }
        return arg
      })
      console[method](`[${timestamp}] [${this.prefix}] `, ...singleLineArgs)
    }
  }

  log: Console["log"] = this.createLoggerMethod("log")
  info: Console["info"] = this.createLoggerMethod("info")
  warn: Console["warn"] = this.createLoggerMethod("warn")
  error: Console["error"] = this.createLoggerMethod("error")
  debug: Console["debug"] = this.createLoggerMethod("debug")
}
