import { gql } from "@apollo/client";
import axios from "axios";
import { ContractReceipt } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { PendingPoolCard } from "@/components/dashboard/pool-card/pending-pool-card";
import { Heading } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import {
  Pool_Status_Type,
  useGetPendingPoolsQuery,
} from "@/lib/graphql/generated";
import { createBorrower } from "@/services/user-services";

// only necessary once we need transaction hashes
gql`
  query getAllPendingPools {
    pendingPools @rest(path: "pool", type: "PendingPools") {
      id
      poolName
      walletAddress
      projectCoverImage
      status
      goalAmount
      borrowerContract
    }
  }
`;

function AdminDashboard() {
  const router = useRouter();
  const { data, error, loading } = useGetPendingPoolsQuery();

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

  const onCreateBorrowerContract = async (
    account: string
  ): Promise<ContractReceipt | undefined> => {
    if (!goldfinchFactory) {
      console.error("Goldfinch factory couldn't be initialized");
      return;
    }
    const borrowerContract = await createBorrower(goldfinchFactory, account);
    console.log(
      `borrower contract address: ${borrowerContract} for ${account}`
    );
    return borrowerContract;
  };

  const handleAdminDecision = async (pool: any, decision: boolean) => {
    const borrowerContract = await onCreateBorrowerContract(
      pool.walletAddress.toLowerCase()
    );

    const response = await axios.patch(`/api/pool/${pool.id}`, {
      status: decision
        ? Pool_Status_Type.Approved
        : Pool_Status_Type.ReviewFailed,
      token: process.env.NEXT_PUBLIC_ADMIN_TOKEN_FOR_API,
      borrowerContract: borrowerContract,
    });
    console.log(response);
  };

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
              buttonText="Approve Pool"
              onButtonClick={(event) => {
                // event.stopPropagation();
                console.log(event);
                handleAdminDecision(tranchedPool, event);
              }}
            />
          ))
        : null}
    </div>
  );
}

export default AdminDashboard;
