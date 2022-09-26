import { Heading, LinkButton } from "@/components/design-system";
import { useLayoutTitle, useSelectedSidebarItem } from "@/hooks/sidebar-hooks";

import PoolDetail from "./pool-details";
import PoolDetailsRightGrid from "./pool-details-grid-right";

function ArtistPoolPage() {
  useSelectedSidebarItem("dashboard");
  useLayoutTitle("Artist Dashboard");

  return (
    <>
      <LinkButton
        buttonType="tertiary"
        href={"/artist/dashboard"}
        iconLeft="CaretLeft"
      >
        Artist Portfolio
      </LinkButton>
      <div className="mb-10 px-4">
        <Heading level={1} className="text-white">
          Collaboration with Sam
        </Heading>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-4 px-4">
            <PoolDetail />
          </div>
          <div className="col-span-2">
            <PoolDetailsRightGrid />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistPoolPage;
