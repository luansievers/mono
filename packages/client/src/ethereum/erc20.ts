import web3 from "../web3"
import BigNumber from "bignumber.js"
import * as ERC20Contract from "./ERC20.json"
import {decimals, USDC_ADDRESSES, USDT_ADDRESSES, BUSD_ADDRESSES} from "./utils"
import {memoize} from "lodash"
import {Contract} from "web3-eth-contract"
import {AbiItem} from "web3-utils/types"
import {GoldfinchProtocol} from "./GoldfinchProtocol"

const Tickers = {
  USDC: "USDC",
  USDT: "USDT",
  BUSD: "BUSD",
}

class ERC20 {
  name: string
  ticker: string
  networksToAddress: any
  localContractName?: string
  permitVersion?: string
  decimals: number
  contract!: Contract
  goldfinchProtocol: GoldfinchProtocol

  constructor(goldfinchProtocol) {
    this.name = "ERC20"
    this.ticker = "ERC20"
    this.goldfinchProtocol = goldfinchProtocol
    this.networksToAddress = {}
    this.decimals = 18
  }

  initialize() {
    if (!this.contract) {
      this.contract = this.initializeContract()
    }
  }

  initializeContract() {
    const config = this.goldfinchProtocol.deployments
    const localContract = this.localContractName && config.contracts[this.localContractName]
    let address
    if (localContract) {
      address = localContract.address
    } else {
      if (process.env.REACT_APP_HARDHAT_FORK) {
        address = this.networksToAddress[process.env.REACT_APP_HARDHAT_FORK]
      } else {
        // Assume we're on testnet or mainnet
        address = this.networksToAddress[this.goldfinchProtocol.networkId]
      }
    }
    const erc20 = new web3.eth.Contract(ERC20Contract.abi as AbiItem[], address)
    return erc20
  }

  get address() {
    return this.contract.options.address
  }

  async getAllowance(opts): Promise<BigNumber> {
    const {owner, spender} = opts
    return new BigNumber(await this.contract.methods.allowance(owner, spender).call())
  }

  async getBalance(address): Promise<BigNumber> {
    return new BigNumber(await this.contract.methods.balanceOf(address).call())
  }

  atomicAmount(decimalAmount) {
    let ten = new BigNumber(10)
    return new BigNumber(String(decimalAmount)).multipliedBy(ten.pow(this.decimals)).toString(10)
  }

  decimalAmount(atomicAmount) {
    let ten = new BigNumber(10)
    return new BigNumber(String(atomicAmount)).div(ten.pow(this.decimals)).toString(10)
  }
}

class USDC extends ERC20 {
  constructor(networkId) {
    super(networkId)
    this.name = "USD Coin"
    this.ticker = Tickers.USDC
    this.networksToAddress = USDC_ADDRESSES
    this.localContractName = "TestERC20"
    this.decimals = 6
    this.permitVersion = this.goldfinchProtocol.networkId === "localhost" ? "1" : "2"
  }
}

class USDT extends ERC20 {
  constructor(networkId) {
    super(networkId)
    this.name = "Tether USD"
    this.ticker = Tickers.USDT
    this.networksToAddress = USDT_ADDRESSES
    this.decimals = 6
  }
}

class BUSD extends ERC20 {
  constructor(networkId) {
    super(networkId)
    this.name = "Binance USD"
    this.ticker = Tickers.BUSD
    this.networksToAddress = BUSD_ADDRESSES
    this.decimals = 18
  }
}

let getERC20 = memoize(
  (ticker, goldfinchProtocol) => {
    let erc20
    switch (ticker) {
      case Tickers.USDC:
        erc20 = new USDC(goldfinchProtocol)
        break
      case Tickers.USDT:
        erc20 = new USDT(goldfinchProtocol)
        break
      case Tickers.BUSD:
        erc20 = new BUSD(goldfinchProtocol)
        break
      default:
        throw new Error("Unsupported currency")
    }

    erc20.initialize()
    return erc20
  },
  (...args) => JSON.stringify(args)
)

function usdcFromAtomic(amount) {
  return new BigNumber(String(amount)).div(decimals.toString()).toString(10)
}

function usdcToAtomic(amount) {
  return new BigNumber(String(amount)).multipliedBy(decimals.toString()).toString(10)
}

function minimumNumber(...args) {
  return BigNumber.minimum(...args).toString(10)
}

export {getERC20, decimals, usdcFromAtomic, usdcToAtomic, minimumNumber, Tickers, ERC20}