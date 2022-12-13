import { BigNumber } from "ethers";

import { Contract } from "@/lib/contracts";

import { lockJuniorCapital, lockPool } from "./pool-services";

/**
 * @param borrowerContract - Borrower contract
 * @param remainingCapacity - string - remaining capacity in the pool used to determine if the pool should be locked
 * @param poolAddress - string - pool address
 * @param amount - number - amount to drawdown
 * @param walletToTransferTo - string - wallet to transfer to
 * @param poolName - string - pool name
 * @Promise ContractReceipt - transaction receipt of drawing (withdrawing) down the Tranched Pool
 */
export const drawdownArtists = async (
  borrowerFactory: Contract<"Borrower">,
  remainingCapacity: string,
  poolAddress: string,
  amount: BigNumber,
  walletToTransferTo: string,
  poolName: string // TODO - add a toasttransaction here with poolName
) => {
  if (remainingCapacity != BigNumber.from(0).toString()) {
    await lockJuniorCapital(borrowerFactory, poolAddress);
    await lockPool(borrowerFactory, poolAddress);
  }
  const receipt = await (
    await borrowerFactory?.drawdown(poolAddress, amount, walletToTransferTo)
  ).wait();
  return receipt;
};

export const artistRepayment = async (
  borrowerContract: Contract<"Borrower">,
  poolAddress: string,
  amount: BigNumber
) => {
  const receipt = await (
    await borrowerContract.pay(poolAddress, amount)
  ).wait();
  return receipt;
};
