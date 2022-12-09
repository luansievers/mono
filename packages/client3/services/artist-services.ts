import { BigNumber, ContractReceipt } from "ethers";

import { Contract } from "@/lib/contracts";

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
): Promise<ContractReceipt> => {
  if (remainingCapacity != BigNumber.from(0).toString()) {
    console.log(
      "Remaining capacity is not 0, locking down junior capital and pool"
    );
    await lockJuniorCapital(borrowerFactory, poolAddress);
    await lockPool(borrowerFactory, poolAddress);
  }
  const receipt = await (
    await borrowerFactory?.drawdown(poolAddress, amount, walletToTransferTo)
  ).wait();
  return receipt;
};

/**
 * Locks the Junior Capital of the Tranched Pool
 * @param borrowerFactory - Borrower contract
 * @param poolAddress - string - pool address
 * @Promise ContractReceipt - transaction receipt of locking junior capital
 */
export const lockJuniorCapital = async (
  borrowerFactory: Contract<"Borrower">,
  poolAddress: string
): Promise<ContractReceipt> => {
  const receipt = await (
    await borrowerFactory?.lockJuniorCapital(poolAddress)
  ).wait();
  return receipt;
};

/**
 * Locks the Tranched Pool so money can be withdrawn.
 * @param borrowerFactory - Borrower contract
 * @param poolAddress - string - pool address
 * @Promise ContractReceipt - transaction receipt of locking junior capital
 */
export const lockPool = async (
  borrowerFactory: Contract<"Borrower">,
  poolAddress: string
): Promise<ContractReceipt> => {
  const receipt = await (await borrowerFactory?.lockPool(poolAddress)).wait();
  return receipt;
};
