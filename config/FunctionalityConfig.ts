import { Config } from "./Config"

export class FunctionalityConfig extends Config {
  watcherUrl: string | undefined
  telegramBotToken: string

  constructor() {
    super()
    this.watcherUrl = process.env.WATCHER_URL
    this.telegramBotToken = this.getEnvVariable("TELEGRAM_BOT_TOKEN")
  }
}
