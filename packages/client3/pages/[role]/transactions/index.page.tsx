import { Heading } from "@/components/design-system";
import { useLayoutTitle, useSelectedSidebarItem } from "@/hooks/sidebar-hooks";

import { TransactionTable } from "./transaction-table";

export default function TransactionsPage() {
  useSelectedSidebarItem("transactions");
  useLayoutTitle("My Transactions");
  return (
    <div>
      <Heading
        as="h1"
        level={2}
        className="mb-12 text-center text-light-10  lg:text-left"
      >
        Transactions
      </Heading>
      <TransactionTable />
    </div>
  );
}
