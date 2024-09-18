export class Config {
  network: string
  apiUrlOverride: string | undefined

  constructor() {
    this.network = (process.env.NETWORK || "testnet").toLowerCase()
    this.apiUrlOverride = process.env.API_URL_OVERRIDE
  }

  protected getPrefixedEnvVariable(key: string): string {
    const networkKey = `${this.network.toUpperCase().replace("-", "_")}_${key}`
    return this.getEnvVariable(networkKey)
  }

  protected getEnvVariable(key: string): string {
    const value = process.env[key]
    if (!value) {
      throw new Error(`Environment variable ${key} is not set`)
    }
    return value
  }
}
