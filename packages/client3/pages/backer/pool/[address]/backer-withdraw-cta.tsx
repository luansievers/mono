import clsx from "clsx";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  BodyText,
  Button,
  Display,
  DollarInput,
  DropDown,
  Form,
  Table,
} from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";

import { IBackerTokenInformation } from "./backer-withdraw-card";

type Props = {
  backerTokenInformation: IBackerTokenInformation;
  onSubmit?: (tokenId: string, amount: string) => void;
};
export interface FormFields {
  backerWithdrawToken: string;
  backerWithdrawAmount: string;
}

export function BackerWithdrawCTA({ backerTokenInformation, onSubmit }: Props) {
  const [totalTokenValue, setTotalTokenValue] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const rhfMethods = useForm<FormFields>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control } = rhfMethods;

  useEffect(() => {
    let totalTokenValue = 0;
    const dropDownOptions = [];
    for (let i = 0; i < backerTokenInformation.length; i++) {
      totalTokenValue +=
        BigNumber.from(
          backerTokenInformation[i].principalRedeemable
        ).toNumber() +
        BigNumber.from(backerTokenInformation[i].interestRedeemable).toNumber();
      dropDownOptions.push(backerTokenInformation[i].id);
    }
    setTotalTokenValue(totalTokenValue);
    setOptions(dropDownOptions);
  }, [backerTokenInformation]);

  const rows = backerTokenInformation.map((token) => {
    return [
      token.id,
      formatCrypto({
        token: SupportedCrypto.Usdc,
        amount: BigNumber.from(
          BigNumber.from(token.principalRedeemable).toNumber() +
            BigNumber.from(token.interestRedeemable).toNumber()
        ),
      }),
    ];
  });

  return (
    <div className="justify-between bg-green-80">
      <div className="w-full items-center p-6">
        <BodyText size="normal" className="text-light-40">
          Available Funds
        </BodyText>
        <Display level={2} className="text-accent-2">
          {formatCrypto({
            token: SupportedCrypto.Usdc,
            amount: BigNumber.from(totalTokenValue),
          })}
        </Display>

        {backerTokenInformation.length > 1 && (
          <Table headings={["NFT #", "Amount Redeemable"]} rows={rows} />
        )}

        <Form
          rhfMethods={rhfMethods}
          onSubmit={(data) => {
            onSubmit &&
              onSubmit(
                data.backerWithdrawToken
                  ? data.backerWithdrawToken
                  : backerTokenInformation[0].id,
                data.backerWithdrawAmount
              );
          }}
        >
          <div className="flex py-2">
            {backerTokenInformation.length > 1 && (
              <DropDown
                control={control}
                placeHolder="NFT#"
                name="backerWithdrawToken"
                rules={{
                  required: "Required",
                }}
                options={options}
              />
            )}
            <DollarInput
              control={control}
              name="backerWithdrawAmount"
              rules={{
                required: "Required",
              }}
              textSize="lg"
              className={clsx(
                "mb-4",
                backerTokenInformation.length > 1 ? "pl-1" : "w-full"
              )}
            />
          </div>
          <Button
            buttonType="accent2"
            type="submit"
            className={clsx("mx-auto mt-4 w-full text-center")}
          >
            Withdraw
          </Button>
        </Form>
      </div>
    </div>
  );
}
