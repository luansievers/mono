import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button, Heading, LinkButton } from "@/components/design-system";
import {
  useLayoutContext,
  useLayoutTitle,
  useSelectedSidebarItem,
} from "@/hooks/sidebar-hooks";

import PoolDetail from "./pool-details";
import PoolDetailsRightGrid from "./pool-details-grid-right";

function ArtistPoolPage() {
  const { title } = useLayoutContext();
  const [poolData, setPoolData] = useState<any>(undefined);
  const router = useRouter();
  const { address } = router.query;
  /**
   * Below code(useEffect) and it's usages need to be replaced by openTranchedPools when create pool insertion is done
   */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/pool`);
      const mappedData = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      const data = mappedData.find((poolData) => poolData.id === address);
      setPoolData(data ?? null);
    };
    fetchData();
  }, [address]);

  if (poolData === undefined) {
    return null;
  }

  return (
    <>
      <Button
        buttonType="tertiary"
        onClick={() => router.back()}
        iconLeft="CaretLeft"
      >
        {title}
      </Button>
      <div className="mb-10 px-4">
        <Heading level={1} className="text-white">
          {poolData?.poolName ?? "Collaboration with Sam"}
        </Heading>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-4 px-4">
            <PoolDetail poolData={poolData} />
          </div>
          <div className="col-span-2">
            <PoolDetailsRightGrid poolData={poolData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistPoolPage;
