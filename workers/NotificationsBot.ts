import { WorkerBase } from "./WorkerBase"
import { AllChain, getSales } from "../functions"
import { ethers } from "ethers"

const FETCH_SALES_NUMBER = 10

export class NotificationsBot extends WorkerBase {

  // initial timeFrom
  private timeFrom = 0
  constructor(
    interval: number,
    private network: AllChain,
    private collectionAddress: string,
    private dryRun = false,
  ) {
    super(interval, "NotificationsBot" + (dryRun ? "-dry" : ""))
    //set time from to now
    this.timeFrom = Math.floor(Date.now() / 1000)
  }

  async iteration() {
    const useTimeFrom = this.timeFrom
    // now lets reset timeFrom to now
    this.timeFrom = Math.floor(Date.now() / 1000)
    console.log("timeFrom", useTimeFrom)
    const lastSales = await getSales({
      "collectionAddress": this.collectionAddress,
      "timeFrom": useTimeFrom.toString(),
    }, 0, FETCH_SALES_NUMBER, "createdAt", "DESC", this.network)

    console.log("found sales", lastSales.length)
    for (const sale of lastSales) {
      console.log(sale)
    }
  }
}
