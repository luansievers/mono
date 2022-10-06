const hre = require("hardhat")

// 0x108Cc3833CD49333A7908e4bB52f4CF8f4090425 - Sacha
// 0xf6E574430ddC45454c469A8f8f140a14590FF9dF - Vineeth
// 0x062765d960DEa3e15cdeB8313ECE1b556FE23FCf - Luan
// 0x9456f8a32a4Cd3750eA551aaC70712e0e374d052 - Harrison
// 0x86D637d8EB368BC61E4A2111D11050B299B2de2c - Christopher
const ARTISTS = [
  "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425",
  "0xf6E574430ddC45454c469A8f8f140a14590FF9dF",
  "0x062765d960DEa3e15cdeB8313ECE1b556FE23FCf",
  "0x9456f8a32a4Cd3750eA551aaC70712e0e374d052",
  "0x86D637d8EB368BC61E4A2111D11050B299B2de2c",
]
const GOLDFINCH_FACTORY = "0xeD785942bcC7c0E8Ae0E444d8B212F2B3e662e7c"

async function main() {
  const GoldfinchFactory = await hre.ethers.getContractFactory("GoldfinchFactory")
  const factory = await GoldfinchFactory.attach(GOLDFINCH_FACTORY)

  for (let i = 0; i < ARTISTS.length; i++) {
    const receipt = await factory.createBorrower(ARTISTS[i])
    const result = await receipt.wait()
    const address = getBorrowerAddress(result)
    console.log(address)
    // await new Promise((r) => setTimeout(r, 6000))
  }
}

function getBorrowerAddress(result) {
  const events = result.events
  const lastEvent = events[events.length - 1]
  return lastEvent.args[0]
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
