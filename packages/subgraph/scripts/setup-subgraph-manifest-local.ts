/* eslint-disable no-console */
import fs from "fs"
import path from "path"

import yaml from "js-yaml"

import devDeployments from "../../protocol/deployments/all_dev.json"
type ContractName = keyof typeof devDeployments["31337"]["localhost"]["contracts"]

console.log("Updating subgraph-local.yaml")

const devDeployments = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../protocol/deployments/all_dev.json")).toString()
)

const localhostContracts = devDeployments["1313161555"].aurora.contracts
const deployedSeniorPoolProxyAddress = localhostContracts.SeniorPool_Proxy.address
const deployedGoldfinchFactoryProxyAddress = localhostContracts.GoldfinchFactory_Proxy.address
const deployedPoolProxyAddress = localhostContracts.Pool_Proxy.address
const deployedPoolTokensProxyAddress = localhostContracts.PoolTokens_Proxy.address
const deployedGoldfinchConfigAddress = localhostContracts.GoldfinchConfig.address
const deployedFiduAddress = localhostContracts.Fidu.address
const deployedGfiAddress = localhostContracts.GFI.address
const deployedStakingRewardsProxyAddress = localhostContracts.StakingRewards_Proxy.address
const deployedBackerRewardsProxyAddress = localhostContracts.BackerRewards_Proxy.address
const deployedOldFixedLeverageRatioStrategyAddress = localhostContracts.FixedLeverageRatioStrategy.address

const subgraphManifest: any = yaml.load(fs.readFileSync(path.resolve(".", "subgraph.yaml")).toString())

for (let dataSource of subgraphManifest.dataSources) {
  dataSource.network = "localhost"
  delete dataSource.source.startBlock
  dataSource.source.address = localhostContracts[dataSource.name as ContractName].address
}

for (let dataSource of subgraphManifest.templates) {
  dataSource.network = "localhost"
}

fs.writeFileSync(path.resolve(__dirname, "../subgraph-local.yaml"), yaml.dump(subgraphManifest, {lineWidth: -1}))

console.log("Finished updating subgraph-local.yaml")
