import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import React from "react";

import { BodyText, Button, Link, Tooltip } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { openVerificationModal } from "@/lib/state/actions";

export function KYC() {
  /** !NOTE: I'm leaving this here for the next poor soul who has to deal with this. 
   * 
   * 
   * Congratulations for getting this far. Below is a code block that configures the Defender Relay with first the needed UID Types and then the signer role - the ability to mint UIDs. 
   * Ideally, Goldfinch would have run the this in their deferred tasks and configured this already...
   * 
  const uniqueIdentityContract = useContract(
    "UniqueIdentity",
    CONTRACT_ADDRESSES.UniqueIdentity
  );
  const SIGNER_ROLE = keccak256(toUtf8Bytes("SIGNER_ROLE"));
  const relay = "0x25190908c3e1c75be8f5cb248425d8c09ed02e22";

  const grantFirstTimePrivileges = async () => {
  const role = await uniqueIdentityContract?.hasRole(SIGNER_ROLE, relay);

  console.log("role", role);

  await uniqueIdentityContract?.setSupportedUIDTypes(
    [0, 1, 2, 3, 4],
    [true, true, true, true, true]
  );

  await uniqueIdentityContract?.grantRole(SIGNER_ROLE, relay);
  };
  grantFirstTimePrivileges();

   */

  const ToolTipInformation = () => (
    <div className="max-w-xs">
      <div className="mb-4 text-xl font-bold text-dark-80">
        Why do I need to KYC?
      </div>
      <div>
        KYC verifies everyone’s identity & reduces fraud in the platform. Learn
        more&nbsp;
        <Link
          href={
            "https://drive.google.com/file/d/1K0CAAACatYbfRkx4IRMwYa1ZNg9_RAf0/view"
          }
        >
          here
        </Link>
      </div>
    </div>
  );

  return (
    <div className="grid place-items-center rounded-lg bg-green-100 pt-[105px] pb-[101px] ">
      <BodyText size="large" className="pb-[24px] text-dark-50">
        To create the first pool, you need to verify identity
      </BodyText>
      <Tooltip placement="bottom-start" content={<ToolTipInformation />}>
        <Button
          className="text-center"
          buttonType="secondary"
          onClick={() => openVerificationModal()}
        >
          Verify Identity
        </Button>
      </Tooltip>
    </div>
  );
}
