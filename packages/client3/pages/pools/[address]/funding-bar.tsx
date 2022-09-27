import clsx from "clsx";
import { BigNumber } from "ethers";

import { Tooltip } from "@/components/design-system";
import { cryptoToFloat, formatCrypto, formatFiat } from "@/lib/format";
import {
  CryptoAmount,
  SupportedCrypto,
  SupportedFiat,
} from "@/lib/graphql/generated";

import diagonals from "./diagonals.png";

interface FundingBarProps {
  goal?: CryptoAmount;
  backerSupply?: CryptoAmount;
  seniorSupply?: CryptoAmount;
}

const zeroUsdc = { token: SupportedCrypto.Usdc, amount: BigNumber.from(0) };

export default function FundingBar({
  goal = zeroUsdc,
  backerSupply = zeroUsdc,
  seniorSupply = zeroUsdc,
}: FundingBarProps) {
  const goalFloat = cryptoToFloat(goal);
  const backerSupplyFloat = cryptoToFloat(backerSupply);
  const seniorSupplyFloat = cryptoToFloat(seniorSupply);

  const backerWidth =
    goalFloat === 0 ? 0 : (backerSupplyFloat / goalFloat) * 100;
  const seniorWidth =
    goalFloat === 0 ? 0 : (seniorSupplyFloat / goalFloat) * 100;

  return (
    <div>
      <div
        className={clsx(
          "text-sand-600 mb-3 flex items-center text-sm",
          backerWidth + seniorWidth < 50 ? "justify-start" : "justify-end"
        )}
        style={
          backerWidth + seniorWidth < 50
            ? { marginLeft: `${Math.min(backerWidth + seniorWidth, 50)}%` }
            : {
                marginRight: `${Math.min(
                  Math.max(100 - backerWidth - seniorWidth, 0),
                  50
                )}%`,
              }
        }
      >
        Supplied{" "}
        <span className="text-sand-700 ml-3 inline-block text-base font-medium">
          {formatFiat({
            symbol: SupportedFiat.Usd,
            amount: backerSupplyFloat + seniorSupplyFloat,
          })}
        </span>
      </div>
      <div
        className="bg-sand-200 mb-3 flex h-8 overflow-hidden rounded"
        style={{
          backgroundImage: `url(${diagonals.src})`,
          backgroundRepeat: "repeat",
        }}
      >
        <div
          className="w-full bg-[#D17673] transition-[max-width] duration-500"
          style={{
            maxWidth: `${backerWidth}%`,
          }}
        >
          <Tooltip
            placement="top"
            content={
              <div className="max-w-[250px]">
                <div className="text-lg font-bold">Junior Capital</div>
                <div>
                  The amount of capital provided to this pool by backers.
                </div>
              </div>
            }
          >
            <div tabIndex={0} className="h-full w-full" />
          </Tooltip>
        </div>
        <div
          className="w-full bg-[#3F4A7E] transition-[max-width] delay-500 duration-500"
          style={{
            maxWidth: `${seniorWidth}%`,
          }}
        >
          <Tooltip
            placement="top"
            content={
              <div className="max-w-[250px]">
                <div className="text-lg font-bold">Senior Capital</div>
                <div>
                  The estimated contribution that the Goldfinch Senior Pool will
                  make.
                </div>
              </div>
            }
          >
            <div tabIndex={0} className="h-full w-full" />
          </Tooltip>
        </div>
      </div>
      <div className="text-sand-600 flex items-center justify-end text-sm">
        Goal{" "}
        <span className="text-sand-700 ml-3 inline-block text-base font-medium">
          {formatCrypto(goal)}
        </span>
      </div>
    </div>
  );
}
