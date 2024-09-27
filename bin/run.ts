#!/usr/bin/env -S yarn ts-node -P ./tsconfig.json
import { NotificationsBot } from "../workers/NotificationsBot"
import { FunctionalityConfig } from "../config/FunctionalityConfig"
import { AllChain, getSales } from "../functions"
import * as dotenv from "dotenv"

dotenv.config()
const config = new FunctionalityConfig()

const discord: boolean = process.argv.includes("--discord") ? true : false
const collectionAddress: string = process.argv.includes("--collection") ? process.argv[process.argv.indexOf("--collection") + 1] : ""
let startFromBlock: number = process.argv.includes("--startFrom") ? parseInt(process.argv[process.argv.indexOf("--startFrom") + 1]) : 0

const networkName = config.network as AllChain

start()

async function start() {
  if (!startFromBlock) {
    const lastSale = await getSales({}, 0, 1, "blockNumber", "DESC", networkName)
    startFromBlock = lastSale[0].blockNumber
  }

  if (discord) {
    if (!collectionAddress) throw new Error("Collection address is required when using discord")
    const loopSeconds = 10
    const bot = new NotificationsBot(1000 * loopSeconds, networkName, collectionAddress, startFromBlock)
    bot.run()
  }
}

setInterval(function () {
  // logs time every 10 minutes
  console.log("still running", new Date())
}, 1000 * 60 * 10)
