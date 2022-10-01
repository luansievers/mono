const hre = require("hardhat")

const TRANCHED_POOL = "0xcb703514651f030e933F3172C8309C19b4e63BE0"
const TRANCHING_LOGIC = "0x35DFFD60fDfBbE491df5F9BE14A5308472E15EEA"

async function main() {
  const TranchedPool = await hre.ethers.getContractFactory("TranchedPool", {
    libraries: {TranchingLogic: TRANCHING_LOGIC},
  })
  const pool = await TranchedPool.attach(TRANCHED_POOL)
  let receipt = await pool.lockJuniorCapital()
  let result = await receipt.wait()
  console.log(result)
  receipt = await pool.lockPool()
  result = await receipt.wait()
  console.log(result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
