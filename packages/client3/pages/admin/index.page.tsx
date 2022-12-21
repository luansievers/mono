import { gql } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import { PendingPoolCard } from "@/components/dashboard/pool-card/pending-pool-card";
import { Heading } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useLayoutTitle } from "@/hooks/sidebar-hooks";
import { useAdmin } from "@/hooks/user-hooks";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import {
  Pool_Status_Type,
  useAllPendingPoolsQuery,
} from "@/lib/graphql/generated";
import { grantAccountBorrowerPrivileges } from "@/services/user-services";

gql`
  query allPendingPools($filters: PendingPoolFilters) {
    pools(filters: $filters) @rest(path: "pool?{args}", type: "pools") {
      id
      poolName
      walletAddress
      projectCoverImage
      status
      goalAmount
    }
  }
`;

function AdminDashboard() {
  useLayoutTitle("Admin Dashboard");

  const router = useRouter();
  const { data } = useAllPendingPoolsQuery({
    variables: {
      filters: {
        statusType: [Pool_Status_Type.InReview],
      },
    },
  });
  const isAdmin = useAdmin();

  const pendingPools = data?.pools ?? [];

  const goldfinchFactory = useContract(
    "GoldFinchFactory",
    CONTRACT_ADDRESSES.GoldFinchFactory
  );

  const handleClick = (poolAddress: string) => {
    router.push(`/artist/pool/${poolAddress}`);
  };

  /**
   * Handles admin decision on a pool
   *
   * @param pool - pool object
   * @param decision - boolean
   * @Promise - updates pool status in metadata
   **/
  const handleAdminDecision = async (
    pool: any,
    decision: boolean
  ): Promise<void> => {
    await onGrantPrivilegesToBorrower(pool.walletAddress.toLowerCase());
    await axios.patch(`/api/pool/${pool.id}`, {
      status: decision
        ? Pool_Status_Type.Approved
        : Pool_Status_Type.ReviewFailed,
      token: process.env.NEXT_PUBLIC_ADMIN_TOKEN_FOR_API,
    });
  };

  /**
   * Grants borrower privileges to an artist
   *
   * @param pool - pool object
   * @param decision - boolean
   * @Promise - updates pool status in metadata
   **/
  const onGrantPrivilegesToBorrower = async (
    account: string
  ): Promise<void> => {
    if (!goldfinchFactory) {
      console.error("Goldfinch factory couldn't be initialized");
      return;
    }
    await grantAccountBorrowerPrivileges(goldfinchFactory, account);
  };

  if (isAdmin) {
    return (
      <div>
        <Heading className="mb-5 flex-1 text-white" level={5}>
          Pools Pending Approval
        </Heading>
        {pendingPools
          ? pendingPools.map((tranchedPool: any) => (
              <PendingPoolCard
                key={tranchedPool.id}
                className="mb-10"
                poolName={tranchedPool.poolName}
                artistName={handleAddressFormat(tranchedPool.walletAddress)}
                image={""}
                statusType={tranchedPool.status}
                onClick={() => handleClick(tranchedPool.id)}
                onButtonClick={(event, decision) => {
                  event.stopPropagation();
                  if (decision) {
                    handleAdminDecision(tranchedPool, decision);
                  }
                }}
              />
            ))
          : null}
      </div>
    );
  } else {
    return (
      <Heading className="flex-1 text-white" level={5}>
        Not an Admin
      </Heading>
    );
  }
}

export default AdminDashboard;
