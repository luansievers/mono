import { Display, BodyText, Icon, Button } from "@/components/design-system";
import { Progress } from "@/components/design-system/progress";

function ArtistCancelPool() {
  return (
    <div className="rounded-lg border border-dark-90 p-6">
      <div className="flex justify-between">
        <Display className="text-accent-2" level={2}>
          $2580.235
        </Display>
        <BodyText size="large" className=" text-dark-50">
          of $10,000
        </BodyText>
      </div>
      <Progress percentage={(2580.235 / 10000) * 100} />
      <div className="mt-9 flex items-center">
        <Display level={2} className="text-white">
          224
        </Display>
        <BodyText size="large" className="ml-4 text-dark-50">
          Backers
        </BodyText>
      </div>
      <div className="mt-8 flex items-center">
        <Display level={2} className="text-white">
          30
        </Display>
        <BodyText size="large" className="ml-4 text-dark-50">
          Days left
        </BodyText>
      </div>
      <div className="flex items-center">
        <Icon size="md" name="Clock" />
        <BodyText size="large" className="ml-3 text-dark-50">
          Closing on Sep 12, 2022
        </BodyText>
      </div>
      <Button buttonType="tertiary" className="mx-auto mt-10 text-accent-3">
        Cancel Pool
      </Button>
    </div>
  );
}

export default ArtistCancelPool;
