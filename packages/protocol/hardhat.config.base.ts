import {findEnvLocal} from "@goldfinch-eng/utils"
import dotenv from "dotenv"
import {
  TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_A,
  TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_B,
} from "./test/blockchain_scripts/merkle/merkleDirectDistributor/fixtures"
import "hardhat-contract-sizer"
import "@openzeppelin/hardhat-upgrades"
import "solidity-docgen"
import {subtask} from "hardhat/config"
import {TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS} from "hardhat/builtin-tasks/task-names"

dotenv.config({path: findEnvLocal()})
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const ALCHEMY_RINKEBY_API_KEY = process.env.ALCHEMY_RINKEBY_API_KEY

// *** Uncomment when you actually want to run on mainnet or testnet ****
// const TEST_PROTOCOL_OWNER_KEY = process.env.TESTNET_PROTOCOL_OWNER_KEY
// const TEST_GF_DEPLOYER_KEY = process.env.TESTNET_GF_DEPLOYER_KEY
// const MAINNET_PROTOCOL_OWNER_KEY = process.env.MAINNET_PROTOCOL_OWNER_KEY
// const MAINNET_GF_DEPLOYER_KEY = process.env.MAINNET_GF_DEPLOYER_KEY

if (process.env.HARDHAT_FORK) {
  process.env["HARDHAT_DEPLOY_FORK"] = process.env.HARDHAT_FORK
}

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(async (_, __, runSuper) => {
  const paths = await runSuper()
  // to make foundry and hardhat co-exist, we are excluding solidity files meant to be
  // be used as foundry tests.
  //
  // Specifically: foundry uses git submodules to pull in dependencies, but hardhat requires
  // any imported dependency to have a corresponding node module. We are explicitly making
  // hardhat not import any foundry file to avoid this issue.
  return paths.filter((p: any) => !p.endsWith(".t.sol"))
})

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      mining: {
        mempool: {
          order: "fifo",
        },
      },
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      accounts: [{privateKey: process.env.PRIVATE_KEY, balance: "100000000000000000000000000"}],
      chainId: process.env.HARDHAT_FORK === "mainnet" ? 1 : 31337,
      forking: process.env.HARDHAT_FORK
        ? {
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            blockNumber: 15348753, // Aug-15-2022 10:56:56 PM +UTC
          }
        : undefined,
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_RINKEBY_API_KEY}`,
      // accounts: [`${TEST_PROTOCOL_OWNER_KEY}`, `${TEST_GF_DEPLOYER_KEY}`],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      // Uncomment when you actually want to run mainnet. Hardhat freaks out otherwise because the private keys are undefined in the default case
      // accounts: [`${MAINNET_PROTOCOL_OWNER_KEY}`, `${MAINNET_GF_DEPLOYER_KEY}`],
    },
    murmuration: {
      url: "https://murmuration.goldfinch.finance/_chain",
      chainId: 31337,
      accounts: {mnemonic: "test test test test test test test test test test test junk"},
    },
    aurora_testnet: {
      url: "https://testnet.aurora.dev",
      chainId: 1313161555,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 100_000,
    },
    aurora_prod: {
      // should be able to get free transactions here: https://aurora.plus/signup
      url: "https://mainnet.aurora.dev/51BMW5Ck2SREwxjt3qVq44EqccRzEtpN7UcYwvTu4wH",
      chainId: 1313161554,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 100_000,
    },
    polygon_prod: {
      // should be able to get free transactions here: https://aurora.plus/signup
      url: "https://mainnet.aurora.dev/51BMW5Ck2SREwxjt3qVq44EqccRzEtpN7UcYwvTu4wH",
      chainId: 1313161554,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 100_000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  mocha: {
    reporter: "list",
  },
  namedAccounts: {
    protocol_owner: {
      default: 0,
      1: "0xc840B3e21FF0EBA77468AD450d868D4362cF67fE",
      4: "0x12B82166fd044aC854D3Fc15C48B5719Ca8Dfb94",
    },
    gf_deployer: {
      default: 0,
      1: "0xa083880F7a5df37Bf00a25380C3eB9AF9cD92D8f",
      4: "0x12B82166fd044aC854D3Fc15C48B5719Ca8Dfb94",
    },
    temp_multisig: {
      1: "0x60d2be34bce277f5f5889adfd4991baefa17461c",
      4: "0x80B9823A6D12Cc00d70E184b2b310d360220E792",
      31337: "0x60d2be34bce277f5f5889adfd4991baefa17461c",
    },
    test_merkle_distributor_recipient_a: {
      hardhat: TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_A,
    },
    test_merkle_distributor_recipient_b: {
      hardhat: TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_B,
    },
    test_merkle_direct_distributor_recipient_a: {
      hardhat: TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_A,
    },
    test_merkle_direct_distributor_recipient_b: {
      hardhat: TEST_MERKLE_DIRECT_DISTRIBUTOR_RECIPIENT_B,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    src: "contracts/protocol",
  },
  tenderly: {
    project: "goldfinch-protocol",
    username: "goldfinch",
    forkNetwork: "1", //Network id of the network we want to fork
  },
  contractSizer: {
    runOnCompile: true,
    // strict: process.env.CI !== undefined,
    // TODO: uncomment this when size decrease is merged
    strict: false,
    except: [":Test.*", ":MigratedTranchedPool$"],
  },
  docgen: {
    // Cf. https://github.com/OpenZeppelin/solidity-docgen/blob/master/src/config.ts
    outputDir: "solidity-docgen-docs",
    pages: "files",
    templates: "docs-templates",
  },
}
