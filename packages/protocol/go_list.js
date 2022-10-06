const hre = require("hardhat")

const GOLDFINCH_CONFIG = "0x2f356aA5E80Ab36B0Ab0849d633b2693Dd03CE94"
// 0x108Cc3833CD49333A7908e4bB52f4CF8f4090425 - Sacha
// 0xf6E574430ddC45454c469A8f8f140a14590FF9dF - Vineeth
// 0x062765d960DEa3e15cdeB8313ECE1b556FE23FCf - Luan
// 0x9456f8a32a4Cd3750eA551aaC70712e0e374d052 - Harrison
// 0x86D637d8EB368BC61E4A2111D11050B299B2de2c - Christopher
const GO_LIST = [
  "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425",
  "0xf6E574430ddC45454c469A8f8f140a14590FF9dF",
  "0x062765d960DEa3e15cdeB8313ECE1b556FE23FCf",
  "0x9456f8a32a4Cd3750eA551aaC70712e0e374d052",
  "0x86D637d8EB368BC61E4A2111D11050B299B2de2c",
]

async function main() {
  const GoldfinchConfig = await hre.ethers.getContractFactory("GoldfinchConfig")
  const config = await GoldfinchConfig.attach(GOLDFINCH_CONFIG)
  let receipt = await config.bulkAddToGoList(GO_LIST)
  let result = await receipt.wait()
  console.log(result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
