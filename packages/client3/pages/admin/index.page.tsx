import { gql } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { PendingPoolCard } from "@/components/dashboard/pool-card/pending-pool-card";
import { Heading } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useAdmin } from "@/hooks/user-hooks";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import {
  Pool_Status_Type,
  useGetPendingPoolsQuery,
} from "@/lib/graphql/generated";
import { grantAccountBorrowerPrivileges } from "@/services/user-services";

gql`
  query getAllPendingPools {
    pendingPools @rest(path: "pool", type: "PendingPools") {
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
  const router = useRouter();
  const { data } = useGetPendingPoolsQuery();
  const isAdmin = useAdmin();
  const [openPoolData, setOpenPoolData] = useState<any[]>([]);

  // only necessary once we need transaction hashes
  const pendingPools = data?.pendingPools ?? [];

  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    CONTRACT_ADDRESSES.GoldFinchFactory
  );

  useEffect(() => {
    const fetchData = async () => {
      let mappedData = [];
      const response = await axios.get(`/api/pool`);
      mappedData = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      setOpenPoolData(mappedData);
    };
    fetchData();
  }, []);

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
        <Heading className="flex-1 text-white" level={5}>
          Admin Dashboard
        </Heading>
        {openPoolData
          ? openPoolData.map((tranchedPool: any) => (
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
