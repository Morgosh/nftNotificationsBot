import { Config } from "./Config"

export class FunctionalityConfig extends Config {
  botKey: string
  watcherUrl: string | undefined
  discordBotToken: string

  constructor() {
    super()
    this.discordBotToken = this.getEnvVariable("DISCORD_BOT_TOKEN")
    this.botKey = this.getEnvVariable("BOT_KEY")
    this.watcherUrl = process.env.WATCHER_URL
  }
}
