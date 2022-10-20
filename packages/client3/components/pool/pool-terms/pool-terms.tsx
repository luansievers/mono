import { Heading, BodyText, Icon } from "@/components/design-system";

type Props = {
  terms: any;
};
export function PoolTerms({ terms }: Props) {
  return (
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
  );
}
