import React from "react";

import { BodyText, Button } from "@/components/design-system";
import { openVerificationModal } from "@/lib/state/actions";

export function KYC() {
  return (
    <div className="grid place-items-center bg-green-100 pt-[105px] pb-[101px] ">
      <BodyText size="large" className="pb-[24px] text-dark-50">
        To create the first pool, you need to verify identity
      </BodyText>
      <Button
        className="text-center"
        buttonType="secondary"
        onClick={() => openVerificationModal()}
      >
        Verify Identity
      </Button>
    </div>
  );
}
