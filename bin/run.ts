#!/usr/bin/env -S yarn ts-node -P ./tsconfig.json
import { NotificationsBot } from "../workers/NotificationsBot"
import { FunctionalityConfig } from "../config/FunctionalityConfig"
import { AllChain } from "../functions"
import * as dotenv from "dotenv"

const result = dotenv.config()
const config = new FunctionalityConfig()

const discord: boolean = process.argv.includes("--discord") ? true : false
const collectionAddress: string = process.argv.includes("--collection") ? process.argv[process.argv.indexOf("--collection") + 1] : ""

const networkName = config.network as AllChain


if (discord) {
  if(!collectionAddress) throw new Error("Collection address is required when using discord")
  const loopSeconds = 10
  const bot = new NotificationsBot(1000 * loopSeconds, networkName, collectionAddress)
  bot.run()
}
