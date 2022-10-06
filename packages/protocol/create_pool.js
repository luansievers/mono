const hre = require("hardhat")

// 0x1788428CF9d9d764F5B858a088F9223367A6D17e - Sacha
// 0xb1D50C9545B8C035D645E1d2D3F42c14247d2947 - Vineeth
// 0x1110A4393EfD46a3118F66B4A67722f9EB675447 - Luan
// 0x92183884BE882a6b825BC00ccB11c41814F1C39C - Harrison
// 0x9fC10f93699d5b29e829f23f40A0782c8C9Bc69F - Christopher
const BORROWERS = [
  "0x1788428CF9d9d764F5B858a088F9223367A6D17e",
  "0xb1D50C9545B8C035D645E1d2D3F42c14247d2947",
  "0x1110A4393EfD46a3118F66B4A67722f9EB675447",
  "0x92183884BE882a6b825BC00ccB11c41814F1C39C",
  "0x9fC10f93699d5b29e829f23f40A0782c8C9Bc69F",
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
