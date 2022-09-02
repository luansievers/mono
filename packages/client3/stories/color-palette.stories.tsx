import { Story, Meta } from "@storybook/react";

import tailwindConfig from "../tailwind.config";

const colors = tailwindConfig.theme.extend.colors;

export default {
  title: "Globals/Color",
} as Meta;

export const ColorStory: Story = () => {
  return (
    <div className="space-y-10">
      {Object.entries(colors).map(([colorName, colorMap], index) =>
        typeof colorMap !== "string" ? (
          <div key={`${index}`}>
            <div className="font-bold dark:text-white">{colorName}</div>
            <div className="flex flex-wrap">
              {Object.entries(colorMap).map(([colorKey, colorValue]) => (
                <ColorSquare
                  key={`${colorKey}-${colorValue}`}
                  colorKey={colorKey}
                  colorValue={colorValue as string}
                />
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

function ColorSquare({
  colorValue,
  colorKey,
}: {
  colorValue: string;
  colorKey: string;
}) {
  return (
    <div>
      <div className="h-16 w-28" style={{ backgroundColor: colorValue }} />
      <div className="font-bold dark:text-white">{colorKey}</div>
      <div className="dark:text-white">{colorValue}</div>
    </div>
  );
}
