import { useApolloClient } from "@apollo/client";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  BodyText,
  Button,
  Caption,
  Chip,
  Display,
  DollarInput,
  Form,
  Icon,
  Input,
  Link,
  Tooltip,
} from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { Progress } from "@/components/design-system/progress";
import { WalletButton } from "@/components/design-system/wallet-button";
import { CONTRACT_ADDRESSES, TRANCHES } from "@/constants";
import { useUser } from "@/hooks/user-hooks";
import { generateErc20PermitSignature, useContract } from "@/lib/contracts";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto, UidType } from "@/lib/graphql/generated";
import {
  approveErc20IfRequired,
  canUserParticipateInPool,
  signAgreement,
  usdcWithinEpsilon,
} from "@/lib/pools";
import { openVerificationModal } from "@/lib/state/actions";
import { toastTransaction } from "@/lib/toast";
import { isSmartContract, useWallet } from "@/lib/wallet";
import { validateMaximumAmountSupply } from "@/utilities/validation.util";

type Props = {
  totalSuppliedAmount: number;
  totalGoalAmount: number;
  totalBackers: number;
  totalEarned: number;
  closingDate: Date;
  tranchedPoolAddress: string;
  allowedUidTypes: UidType[];
  remainingJuniorCapacity: BigNumber;
  type?: "completed" | "failed";
  agreement?: string;
};

interface FormFields {
  supply: string;
  backerName: string;
}

const ToolTipInformation = () => (
  <div className="max-w-xs">
    <div className="mb-4 text-xl font-bold text-dark-80">
      What do I receive for my contribution
    </div>
    <div>
      You receive a token that holds details of your revenue % and relevant
      perks. Over time, this token allows the project to distribute revenue
      accordingly. View step-by-step to contribute&nbsp;
      <Link
        target={"_blank"}
        href={
          "https://drive.google.com/file/d/1K0CAAACatYbfRkx4IRMwYa1ZNg9_RAf0/view"
        }
      >
        here
      </Link>
    </div>
  </div>
);

export function PoolInformation({
  totalSuppliedAmount,
  totalGoalAmount,
  totalBackers,
  totalEarned,
  closingDate,
  type,
  agreement,
  tranchedPoolAddress,
  allowedUidTypes,
  remainingJuniorCapacity,
}: Props) {
  const apolloClient = useApolloClient();
  const { account, provider } = useWallet();
  const tranchedPoolContract = useContract("TranchedPool", tranchedPoolAddress);
  const usdcContract = useContract("USDC", CONTRACT_ADDRESSES.USDC);
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const isUserVerified =
    user?.isGoListed ||
    user?.isUsEntity ||
    user?.isNonUsEntity ||
    user?.isUsAccreditedIndividual ||
    user?.isUsNonAccreditedIndividual ||
    user?.isNonUsIndividual;

  const canUserParticipate = user
    ? canUserParticipateInPool(allowedUidTypes, user)
    : false;

  const rhfMethods = useForm<FormFields>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control, register } = rhfMethods;
  const [availableBalance, setAvailableBalance] = useState(BigNumber.from(0));

  const validateMaximumAmount = async (value: string) =>
    await validateMaximumAmountSupply(
      value,
      account,
      usdcContract,
      remainingJuniorCapacity,
      availableBalance
    );

  const onSubmit = async (data: FormFields) => {
    setIsLoading(true);
    if (!usdcContract || !provider || !account) {
      throw new Error("Wallet not connected properly");
    }
    await signAgreement(account, data.backerName, tranchedPoolAddress);

    // Ensures the user doesn't leave any dust behind when they choose to supply max
    let value = BigNumber.from(data.supply).mul(BigNumber.from(10).pow(6));
    if (usdcWithinEpsilon(value, availableBalance)) {
      value = availableBalance;
    }

    if (!tranchedPoolContract) {
      throw new Error("Wallet not connected properly");
    }
    if (await isSmartContract(account, provider)) {
      await approveErc20IfRequired({
        account,
        spender: tranchedPoolAddress,
        amount: value,
        erc20Contract: usdcContract,
      });
      await toastTransaction({
        transaction: tranchedPoolContract.deposit(TRANCHES.Junior, value),
        pendingPrompt: `Deposit submitted for pool ${tranchedPoolAddress}.`,
      });
    } else {
      const now = (await provider.getBlock("latest")).timestamp;
      /**
       * Note : Sometime the timestamp returned by the provider(metamask) is of old blocks and would cause 1hr deadline to fail.
       * Increasing the deadline seems to fix it but not the ideal approach.
       */

      await approveErc20IfRequired({
        account,
        spender: tranchedPoolAddress,
        amount: value,
        erc20Contract: usdcContract,
      });
      await toastTransaction({
        transaction: tranchedPoolContract.deposit(TRANCHES.Junior, value),
        pendingPrompt: `Deposit submitted for pool ${tranchedPoolAddress}.`,
      });
    }
    await apolloClient.refetchQueries({ include: "active" });
    setIsLoading(false);
  };

  useEffect(() => {
    if (!usdcContract || !account) {
      return;
    }
    usdcContract
      .balanceOf(account)
      .then((balance) => setAvailableBalance(balance));
  }, [usdcContract, account]);

  const progressPercentage = (totalSuppliedAmount / totalGoalAmount) * 100;

  const diffDays = Math.round(
    (new Date(closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="rounded-lg border border-dark-90 p-6">
      {type && (
        <>
          <div className="pb-6">
            <Chip type={type}>
              {type == "completed" ? "Completed" : "Failed"}
            </Chip>
          </div>

          <BodyText size="large" className="pb-4 text-light-40">
            {type == "completed"
              ? "Successfully funded and closed on "
              : "Failed and closed on "}
            {new Date(closingDate).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            .
          </BodyText>
          <Divider className="pb-8" />
        </>
      )}
      <div className="flex items-center justify-between">
        <Display
          level={2}
          className={type == "failed" ? "text-accent-3" : "text-accent-2"}
        >
          {formatCrypto({
            token: SupportedCrypto.Usdc,
            amount: BigNumber.from(totalSuppliedAmount ?? 0),
          })}
        </Display>
        <BodyText size="large" className=" text-dark-50">
          of{" "}
          {formatCrypto({
            token: SupportedCrypto.Usdc,
            amount: BigNumber.from(totalGoalAmount ?? 0),
          })}
        </BodyText>
      </div>
      <Progress
        className="mt-6 mb-8"
        percentage={progressPercentage}
        type={type}
      />
      {type && (
        <div className="mb-8 flex items-center justify-start">
          <Display level={2} className="text-white">
            ${totalEarned}
          </Display>
          <BodyText size="large" className="ml-4 text-dark-50">
            Earned
          </BodyText>
        </div>
      )}
      <div className="flex items-center justify-start">
        <Display level={2} className="text-white">
          {totalBackers}
        </Display>
        <BodyText size="large" className="ml-4 text-dark-50">
          Backers
        </BodyText>
      </div>
      {!type && (
        <>
          <div className="mt-8 mb-2 flex items-center justify-start">
            <Display level={2} className="text-white">
              {diffDays < 0 ? 0 : diffDays}
            </Display>
            <BodyText size="large" className="ml-4 text-dark-50">
              Days left
            </BodyText>
          </div>
          <BodyText size="small" className="mb-6 text-dark-50">
            <Icon size="md" name="Clock" className="mr-3" />
            Closing on&nbsp;
            {new Date(closingDate).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </BodyText>

          {!account ? (
            <WalletButton className="w-full justify-center bg-accent-2" />
          ) : !isUserVerified ? (
            <Button
              className="w-full justify-center bg-accent-2"
              onClick={() => openVerificationModal()}
            >
              Verify Identity
            </Button>
          ) : !canUserParticipate ? (
            <div>
              <div className="mt-3 flex items-center justify-center gap-3 text-sm text-white">
                <Icon size="md" name="Exclamation" />
                <div>
                  Sorry, you are not eligible to participate in this pool
                  because you do not have a suitable UID.
                </div>
              </div>
            </div>
          ) : diffDays < 1 ? null : (
            <Form rhfMethods={rhfMethods} onSubmit={onSubmit}>
              <DollarInput
                control={control}
                name="supply"
                rules={{
                  required: "Required",
                  validate: validateMaximumAmount,
                }}
                textSize="lg"
                className="mb-4"
              />
              <Input
                placeholder="Legal first and last name"
                textSize="lg"
                className="mb-4"
                {...register("backerName", { required: "Required" })}
              />
              <Caption className="text-dark-50">
                By entering my name and clicking “Contribute” below, I hereby
                agree and acknowledge that (i) I am electronically signing and
                becoming a party to this co-operative&nbsp;
                <Link
                  target={"_blank"}
                  href={
                    "https://drive.google.com/file/d/1K0CAAACatYbfRkx4IRMwYa1ZNg9_RAf0/view"
                  }
                >
                  <Caption className="text-dark-50">(FAQ)</Caption>
                </Link>
                , (ii) I am electronically agreeing to the Terms & Services
                outlined&nbsp;
                <Link
                  target={"_blank"}
                  href={
                    "https://drive.google.com/file/d/1K0CAAACatYbfRkx4IRMwYa1ZNg9_RAf0/view"
                  }
                >
                  <Caption className="text-dark-50"> here</Caption>
                </Link>
                &nbsp; and (iii) my name and transaction information may be
                shared with the artist.
              </Caption>
              <Tooltip
                placement="bottom-start"
                content={<ToolTipInformation />}
              >
                <Button
                  type="submit"
                  isLoading={{ isLoading }}
                  className="mt-6 w-full justify-center bg-accent-2"
                >
                  Contribute to this artist
                </Button>
              </Tooltip>
            </Form>
          )}
        </>
      )}
    </div>
  );
}
