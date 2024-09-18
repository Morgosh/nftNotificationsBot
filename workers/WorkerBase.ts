import { Logger } from "../utility/Logger"

export abstract class WorkerBase {
  protected logger: Logger

  constructor(protected interval: number, private name: string) {
    this.logger = new Logger(name)
  }

  protected abstract iteration(): void

  run(): void {
    const safeIteration = async () => {
      this.logger.log("Starting iteration.")
      try {
        await this.iteration()
      }
      catch (err) {
        this.logger.error(err)
      }
      this.logger.log("Finished iteration.")
    }

    // Execute immediately and after interval henceforth
    safeIteration()
    setInterval(safeIteration, this.interval)
  }
}
