import { BigNumber, utils } from "ethers";

import { USDC_DECIMALS } from "@/constants";
import { usdcWithinEpsilon } from "@/lib/pools";

export const validateMaximumAmountSupply = async (
  value: string,
  account: unknown,
  usdcContract: unknown,
  remainingJuniorCapacity: BigNumber,
  availableBalance: BigNumber
) => {
  if (!account || !usdcContract) {
    return;
  }
  const valueAsUsdc = utils.parseUnits(value, USDC_DECIMALS);
  if (valueAsUsdc.gt(remainingJuniorCapacity)) {
    return "Amount exceeds remaining junior capacity";
  }
  if (valueAsUsdc.lte(BigNumber.from(0))) {
    return "Must deposit more than 0";
  }
  if (
    valueAsUsdc.gt(availableBalance) &&
    !usdcWithinEpsilon(valueAsUsdc, availableBalance)
  ) {
    return "Amount exceeds USDC balance";
  }
};
