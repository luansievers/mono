import { BodyText, Heading, Icon } from "@/components/design-system";

import ArtistCancelPool from "./artist-cancel-pool";
import ArtistPoolDocuments from "./artist-pool-documents";

type Props = {
  poolData: any;
};

function PoolDetailsRightGrid({ poolData }: Props) {
  const terms = poolData?.terms;
  return (
    <>
      <ArtistCancelPool poolData={poolData} />

      <div className="mt-9 rounded-lg border border-dark-90 p-6">
        <Heading className="text-white" level={5}>
          Terms
        </Heading>
        <div className="mt-6 flex items-center">
          <BodyText size="normal" className="text-dark-50">
            Project Goal
          </BodyText>
          <Icon className="ml-2" size="text" name="InfoCircleOutlined" />
        </div>
        <BodyText size="medium" semiBold className="mt-3 text-light-40">
          {terms?.projectGoal ?? "5-track EP"}
        </BodyText>
        <div className="mt-6 flex items-center">
          <BodyText size="normal" className="text-dark-50">
            Raised Target
          </BodyText>
          <Icon className="ml-2" size="text" name="InfoCircleOutlined" />
        </div>
        <BodyText size="medium" semiBold className="mt-3 text-light-40">
          {terms?.raisedTarget ?? "3% Revenue"}
        </BodyText>
      </div>

      <ArtistPoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
