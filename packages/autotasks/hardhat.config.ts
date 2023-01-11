import "tsconfig-paths/register"
import "@nomiclabs/hardhat-truffle5"
import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import baseConfig from "@goldfinch-eng/protocol/hardhat.config.base"

const config = {
  ...baseConfig,
  paths: {
    artifacts: "../protocol/artifacts",
    cache: "../protocol/cache",
  },
  external: {
    contracts: [
      {
        artifacts: "../protocol/artifacts",
        deploy: "../protocol/deploy",
      },
    ],
    deployments: {
      localhost: ["../protocol/deployments/localhost"],
      mainnet: ["../protocol/deployments/mainnet"],
      rinkeby: ["../protocol/deployments/rinkeby"],
      aurora_testnet: ["../protocol/deployments/aurora"],
      aurora_mainnet: ["../protocol/deployments/aurora_prod"],
    },
  },
}

export default config
