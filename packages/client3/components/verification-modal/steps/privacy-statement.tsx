import clsx from "clsx";

import { Link } from "@/components/design-system";

export function PrivacyStatement({ className }: { className?: string }) {
  return (
    <p className={clsx("text-sand-500 text-justify text-xs", className)}>
      All information you provide is kept secure and will not be used for any
      purpose beyond executing your transactions.{" "}
      <Link
        href="https://docs.goldfinch.finance/goldfinch/unique-identity-uid"
        target="_blank"
        rel="noopener"
      >
        Why does Free Artists KYC?
      </Link>
    </p>
  );
}
