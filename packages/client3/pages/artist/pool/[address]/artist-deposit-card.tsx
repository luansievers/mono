import clsx from "clsx";
import { BigNumber } from "ethers";
import { useForm } from "react-hook-form";

import {
  BodyText,
  Button,
  Display,
  DollarInput,
  Icon,
  Link,
} from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";

import { EventType } from "./artist-pool-information";

type Props = {
  repayed: BigNumber;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: EventType
  ) => void;
};
interface FormFields {
  deposit: string; //NOTE: Check to make sure this is not number
}

function ArtistDepositCard({ repayed, onButtonClick }: Props) {
  // ------------ FAD-172 ---------
  const rhfMethods = useForm<FormFields>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control } = rhfMethods;

  const validateMaximumAmount = (value: string) => {
    const amount = Number(value);
    if (amount > 0 && amount <= Number(repayed)) {
      return true;
    } else {
      return "Invalid amount";
    }
  };
  // ------------ FAD-172 ---------

  return (
    <div className="mt-2 flex items-center rounded-lg bg-green-80">
      <div className="w-full items-center p-6">
        <BodyText size="normal" className="text-light-40">
          Revenue
        </BodyText>
        <BodyText size="small" className="mt-2 text-light-40">
          Revenue Distributed to backers
        </BodyText>
        {repayed > BigNumber.from(0) ? (
          <div className="mt-6 flex justify-between">
            <>
              <Display level={2} className="text-accent-2">
                {formatCrypto({
                  token: SupportedCrypto.Usdc,
                  amount: BigNumber.from(repayed ?? 0),
                })}
              </Display>
              <Link href="/artist/transactions" className="pt-2 text-accent-2">
                Transaction
                <Icon name="Link" className="ml-1 border-accent-2" />
              </Link>
            </>
          </div>
        ) : (
          <></>
        )}
        <div className="my-4 w-full border border-dark-50" />

        <BodyText size="small" className="text-light-40">
          Deposit Revenue
        </BodyText>
        <DollarInput
          control={control}
          name="deposit"
          rules={{
            required: "Required",
            validate: validateMaximumAmount, // TODO: FAD-172
          }}
          textSize="lg"
          className="mb-4"
        />
        <Button
          buttonType="accent2"
          type="submit"
          className={clsx("mx-auto mt-4 w-full text-center")}
          onClick={(event) => {
            onButtonClick && onButtonClick(event, EventType.DEPOSIT);
          }}
        >
          Deposit
        </Button>
      </div>
    </div>
  );
}

export default ArtistDepositCard;
