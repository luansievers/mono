import {HardhatRuntimeEnvironment} from "hardhat/types"
import {AURORA_PROD_CHAIN_ID} from "../blockchain_scripts/deployHelpers"
import {setUpForTesting} from "../blockchain_scripts/setUpForTesting"

async function main(hre) {
  await setUpForTesting(hre)
}

module.exports = main
module.exports.dependencies = ["base_deploy"]
module.exports.tags = ["setup_for_testing"]
module.exports.skip = async ({getChainId}: HardhatRuntimeEnvironment) => {
  const chainId = await getChainId()
  return String(chainId) === AURORA_PROD_CHAIN_ID
}
