import {deployPoolRewards} from "../../baseDeploy"
import {ContractDeployer, ContractUpgrader, getProtocolOwner, getTruffleContract} from "../../deployHelpers"
import hre from "hardhat"
import {GoldfinchConfigInstance} from "../../../typechain/truffle"
import {DeployEffects} from "../deployEffects"

export async function deploy(deployEffects: DeployEffects) {
  const deployer = new ContractDeployer(console.log, hre)
  const upgrader = new ContractUpgrader(deployer)

  const upgradedContracts = await upgrader.upgrade({contracts: ["SeniorPool"]}) // "UniqueIdentity", "PoolTokens", "CreditLine"

  const config = await getTruffleContract<GoldfinchConfigInstance>("GoldfinchConfig", {from: await getProtocolOwner()})
  const poolRewards = await deployPoolRewards(deployer, {configAddress: config.address, deployEffects})

  return {
    deployedContracts: {
      poolRewards,
    },
    upgradedContracts,
  }
}
