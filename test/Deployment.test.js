const {BN, expect} = require("./testHelpers.js")
const hre = require("hardhat")
const {deployments, getNamedAccounts, ethers} = hre
const {getDeployedContract, fromAtomic, toAtomic, OWNER_ROLE} = require("../blockchain_scripts/deployHelpers")
const {CONFIG_KEYS} = require("../blockchain_scripts/configKeys")
const updateConfigs = require("../blockchain_scripts/updateConfigs")

describe("Deployment", async () => {
  describe("Base Deployment", () => {
    beforeEach(async () => {
      await deployments.fixture("base_deploy")
    })
    it("deploys the pool", async () => {
      const pool = await deployments.get("TestPool")
      expect(pool.address).to.exist
    })
    it("deploys a proxy for the pool as well", async () => {
      const poolProxy = await deployments.getOrNull("TestPool_Proxy")
      expect(poolProxy).to.exist
    })

    it("should set the protocol owner to the treasury reserve", async () => {
      const {protocol_owner} = await getNamedAccounts()
      const config = await getDeployedContract(deployments, "TestGoldfinchConfig")
      expect(await config.getAddress(CONFIG_KEYS.TreasuryReserve)).to.equal(protocol_owner)
    })
    it("deploys the credit desk", async () => {
      const creditDesk = await deployments.get("TestCreditDesk")
      expect(creditDesk.address).to.exist
    })
    it("deploys a proxy for the credit desk as well", async () => {
      const creditDeskProxy = await deployments.getOrNull("TestCreditDesk_Proxy")
      expect(creditDeskProxy).to.exist
    })
    it("sets the credit desk as the owner of the pool", async () => {
      const creditDesk = await deployments.get("TestCreditDesk")
      const pool = await getDeployedContract(deployments, "TestPool")
      expect(await pool.hasRole(OWNER_ROLE, creditDesk.address)).to.be.true
    })
    it("sets the right defaults", async () => {
      const creditLineFactory = await getDeployedContract(deployments, "CreditLineFactory")
      const goldfinchConfig = await getDeployedContract(deployments, "TestGoldfinchConfig")

      expect(String(await goldfinchConfig.getNumber(CONFIG_KEYS.TransactionLimit))).to.bignumber.gt(new BN(0))
      expect(String(await goldfinchConfig.getNumber(CONFIG_KEYS.TotalFundsLimit))).to.bignumber.gt(new BN(0))
      expect(String(await goldfinchConfig.getNumber(CONFIG_KEYS.MaxUnderwriterLimit))).to.bignumber.gt(new BN(0))
      expect(await goldfinchConfig.getAddress(CONFIG_KEYS.CreditLineFactory)).to.equal(creditLineFactory.address)
    })
  })

  // TODO: Fix Setup For Testing, and this test.
  // This stuff is all broken now, because we don't use the Pool in V2.
  // Setup For Testing does not currently account for that. It should switch
  // to using the SeniorPool, and creating TranchedPools and all that.
  xdescribe("Setup for Testing", () => {
    it("should not fail", async () => {
      return expect(deployments.run("setup_for_testing")).to.be.fulfilled
    })
    it("should create an underwriter credit line for the protocol_owner", async () => {
      const {protocol_owner} = await getNamedAccounts()
      await deployments.run("setup_for_testing")
      const creditDesk = await getDeployedContract(deployments, "TestCreditDesk")
      const result = await creditDesk.getUnderwriterCreditLines(protocol_owner)
      expect(result.length).to.equal(2)
    })
  })

  xdescribe("Upgrading", () => {
    beforeEach(async () => {
      await deployments.fixture()
    })

    it("should allow you to change the owner of the implementation, without affecting the owner of the proxy", async () => {
      const creditDesk = await getDeployedContract(deployments, "CreditDesk")
      const someWallet = ethers.Wallet.createRandom()

      const originally = await creditDesk.hasRole(OWNER_ROLE, someWallet.address)
      expect(originally).to.be.false

      await creditDesk.grantRole(OWNER_ROLE, someWallet.address)

      const afterGrant = await creditDesk.hasRole(OWNER_ROLE, someWallet.address)
      expect(afterGrant).to.be.true
    })

    it("should allow for a way to transfer ownership of the proxy", async () => {
      const {protocol_owner, proxy_owner} = await getNamedAccounts()
      const creditDeskProxy = await getDeployedContract(deployments, "CreditDesk_Proxy", proxy_owner)

      const originalOwner = await creditDeskProxy.owner()
      expect(originalOwner).to.equal(proxy_owner)

      const result = await creditDeskProxy.transferOwnership(protocol_owner)
      await result.wait()

      const newOwner = await creditDeskProxy.owner()
      expect(newOwner).to.equal(protocol_owner)
    })
  })

  xdescribe("Updating configs", async () => {
    beforeEach(async () => {
      await deployments.fixture()
    })

    it("Should update protocol configs", async () => {
      const {protocol_owner} = await getNamedAccounts()
      let underwriter = protocol_owner
      const creditDesk = await getDeployedContract(deployments, "CreditDesk")
      const config = await getDeployedContract(deployments, "TestGoldfinchConfig")

      const new_config = {
        totalFundsLimit: 2000,
        transactionLimit: 1000,
        maxUnderwriterLimit: 2000,
        reserveDenominator: 11,
        withdrawFeeDenominator: 202,
        latenessGracePeriod: 9,
        latenessMaxDays: 6,
      }

      await expect(creditDesk.setUnderwriterGovernanceLimit(underwriter, toAtomic(24000))).to.be.fulfilled

      await updateConfigs(hre, new_config)

      await expect(creditDesk.setUnderwriterGovernanceLimit(underwriter, toAtomic(24000))).to.be.rejectedWith(
        /greater than the max allowed/
      )

      expect(fromAtomic(await config.getNumber(CONFIG_KEYS.TotalFundsLimit))).to.bignumber.eq(
        new BN(new_config["totalFundsLimit"])
      )
      expect(fromAtomic(await config.getNumber(CONFIG_KEYS.TransactionLimit))).to.bignumber.eq(
        new BN(new_config["transactionLimit"])
      )
      expect(fromAtomic(await config.getNumber(CONFIG_KEYS.MaxUnderwriterLimit))).to.bignumber.eq(
        new BN(new_config["maxUnderwriterLimit"])
      )

      expect(String(await config.getNumber(CONFIG_KEYS.ReserveDenominator))).to.eq(
        String(new_config["reserveDenominator"])
      )
      expect(String(await config.getNumber(CONFIG_KEYS.WithdrawFeeDenominator))).to.eq(
        String(new_config["withdrawFeeDenominator"])
      )
      expect(String(await config.getNumber(CONFIG_KEYS.LatenessGracePeriodInDays))).to.eq(
        String(new_config["latenessGracePeriod"])
      )
      expect(String(await config.getNumber(CONFIG_KEYS.LatenessMaxDays))).to.eq(String(new_config["latenessMaxDays"]))
    })
  })
})
