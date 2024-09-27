import { WorkerBase } from "./WorkerBase"
import { AllChain, getSales } from "../functions"

const FETCH_SALES_NUMBER = 10

export class NotificationsBot extends WorkerBase {
  // initial timeFrom
  private blockFrom = 0
  constructor(
    interval: number,
    private network: AllChain,
    private collectionAddress: string,
    private startFromBlock: number,
    private dryRun = false,
  ) {
    super(interval, "NotificationsBot" + (dryRun ? "-dry" : ""))
    // set time from to now
    this.blockFrom = this.startFromBlock
  }

  async iteration() {
    const useBlockFrom = this.blockFrom
    // now lets reset timeFrom to now
    console.log("useBlockFrom", useBlockFrom)
    const lastSales = await getSales({
      collectionAddress: this.collectionAddress,
      blockFrom: useBlockFrom.toString(),
    }, 0, FETCH_SALES_NUMBER, "blockNumber", "ASC", this.network)

    console.log("found sales", lastSales.length)
    if (lastSales.length > 0) {
      for (const sale of lastSales) {
        console.log(sale)
      }
      this.blockFrom = lastSales[lastSales.length - 1].blockNumber
    }
  }
}
