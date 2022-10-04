const hre = require("hardhat")

// 0x289CD6Ed75B813758eC772bCBD8faF3bD27f189c - Constantin, 2nd account
// 0xC76dEA80dAb310e48FBD1e752e509C98e1B92107 - Sacha
// 0x32bbC59B11Ee8d5A04eD9602Cf50e609bd0cba0D - Vineeth
// 0x3FD3FBE99EBe1DaF8a0236506712791faFc073E9 - Luan
// 0x520027C8aE6213fEC5C932d04784D37EaA88e386 - Harrison
// 0x6a10b1Df7016F82FE9B666D0049C804f9427a61a - Christopher
const BORROWERS = [
  // "0x289CD6Ed75B813758eC772bCBD8faF3bD27f189c",
  // "0xC76dEA80dAb310e48FBD1e752e509C98e1B92107",
  // "0x32bbC59B11Ee8d5A04eD9602Cf50e609bd0cba0D",
  // "0x3FD3FBE99EBe1DaF8a0236506712791faFc073E9",
  // "0x520027C8aE6213fEC5C932d04784D37EaA88e386",
  // "0x6a10b1Df7016F82FE9B666D0049C804f9427a61a",
  "0xA9A3EF4b6a18189A8A77EbDD68233F9339b8Cd9b",
]
const GOLDFINCH_FACTORY = "0xeD785942bcC7c0E8Ae0E444d8B212F2B3e662e7c"
const JUNIOR_FEE_PERCENT = "20"
const LIMIT = "10000000000"
const INTEREST_APR = "100000000000000000" // 10% APR
const PAYMENT_PERIOD_IN_DAYS = "10"
const TERM_IN_DAYS = "365"
const LATE_FEE_APR = "0"
const PRINCIPAL_GRACE_PERIOD_IN_DAYS = "185"
const FUNDABLE_AT = "0"
const ALLOWED_UID = [0]

async function main() {
  const GoldfinchFactory = await hre.ethers.getContractFactory("GoldfinchFactory")
  const factory = await GoldfinchFactory.attach(GOLDFINCH_FACTORY)

  for (let i = 0; i < BORROWERS.length; i++) {
    const receipt = await factory.createPool(
      BORROWERS[i],
      JUNIOR_FEE_PERCENT,
      LIMIT,
      INTEREST_APR,
      PAYMENT_PERIOD_IN_DAYS,
      TERM_IN_DAYS,
      LATE_FEE_APR,
      PRINCIPAL_GRACE_PERIOD_IN_DAYS,
      FUNDABLE_AT,
      ALLOWED_UID
    )
    const result = await receipt.wait()
    const address = getPoolAddress(result)
    console.log(address)
    await new Promise((r) => setTimeout(r, 6000))
  }
}

function getPoolAddress(result) {
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
