import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";

import { Display, Heading, BodyText, Caption } from "./index";

export default {
  title: "FAD/Components/Typography",
} as Meta;

interface GridRowProps {
  displayName: string;
  sample: ReactNode;
}

const GridRow = ({ displayName, sample }: GridRowProps) => {
  return (
    <>
      <div>{displayName}</div>
      <div>{sample}</div>
    </>
  );
};

export const AllTypographyStory: Story<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {([1, 2] as const).map((level) => (
        <GridRow
          key={level}
          displayName={`Display ${level}`}
          sample={<Display level={level}>{text}</Display>}
        />
      ))}
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <GridRow
          key={level}
          displayName={`Heading ${level}`}
          sample={
            <div>
              <Heading level={level}>{text}</Heading>
              {level >= 5 && (
                <Heading level={level} medium={true}>
                  {text}
                </Heading>
              )}
            </div>
          }
        />
      ))}
      {(["large", "medium", "normal", "small"] as const).map((size) => (
        <GridRow
          key={size}
          displayName={`BodyText ${size}`}
          sample={
            <div>
              Regular
              <BodyText size={size}>{text}</BodyText>
              SemiBold
              <BodyText size={size} semiBold={true}>
                {text}
              </BodyText>
            </div>
          }
        />
      ))}
      <GridRow
        key="caption"
        displayName="Caption"
        sample={<Caption>{text}</Caption>}
      />
    </div>
  );
};

AllTypographyStory.args = {
  text: "The quick brown fox jumped over the lazy dog.",
};
