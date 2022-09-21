import { Heading, BodyText, Input } from "@/components/design-system";

function CreatePoolTerms() {
  return (
    <>
      <Heading className="my-auto text-white" level={4}>
        Terms
      </Heading>
      <BodyText size="medium" className="col-span-3 my-auto text-light-40">
        This term has to be match with your term sheet
      </BodyText>

      <BodyText className="my-auto text-white" size="normal">
        Project Goal
      </BodyText>
      <Input
        className="col-span-3"
        name="projectGoal"
        inputMode="text"
        placeholder="Single, EP, Album, ect."
      />
      <BodyText className="my-auto text-white" size="normal">
        Raised Target
      </BodyText>
      <Input
        className="col-span-3"
        name="raisedTarget"
        inputMode="text"
        placeholder="Revenue, Equity, ect."
      />
    </>
  );
}

export default CreatePoolTerms;
