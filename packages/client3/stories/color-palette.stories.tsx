import { Story, Meta } from "@storybook/react";

import tailwindConfig from "../tailwind.config";

const colors = tailwindConfig.theme.extend.colors;

export default {
  title: "FAD/Globals/Color",
} as Meta;

export const ColorStory: Story = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      {Object.entries(colors).map(([colorName, colorMap], index) =>
        typeof colorMap !== "string" ? (
          <div
            key={index}
            className="flex flex-col space-y-3 text-xs sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <div className="w-16 shrink-0">
              <div className="flex h-10 flex-col justify-center">
                <div className="text-sm font-semibold capitalize text-slate-900 dark:text-slate-200">
                  {colorName}
                </div>
              </div>
            </div>
            <div className="grid min-w-0 flex-1 grid-cols-5 gap-x-4 gap-y-3 2xl:grid-cols-10 2xl:gap-x-2">
              {Object.entries(colorMap).map(([colorKey, colorValue]) =>
                typeof colorValue === "string" ? (
                  <ColorSquare
                    key={`${colorKey}-${colorValue}`}
                    colorKey={colorKey}
                    colorValue={colorValue as string}
                  />
                ) : (
                  <div key={`${colorKey}-${colorValue}`}>
                    {Object.entries(colorValue).map(
                      ([colorKey2, colorValue2]) => (
                        <ColorSquare
                          key={`${colorKey2}-${colorValue2}`}
                          colorKey={`${colorKey}-${colorKey2}`}
                          colorValue={colorValue2 as string}
                        />
                      )
                    )}
                  </div>
                )
              )}
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
    <div className="relative flex">
      <div className="cursor-pointer space-y-1.5">
        <div
          className="h-10 w-full rounded border-2 border-black dark:border-white dark:ring-1 dark:ring-inset dark:ring-white/10"
          style={{ backgroundColor: colorValue }}
        />
        <div className="px-0.5 md:flex md:justify-between md:space-x-2 2xl:block 2xl:space-x-0">
          <div className="w-15 font-medium text-slate-900 dark:text-white 2xl:w-full">
            {colorKey}
          </div>
          <div className="font-mono lowercase text-slate-500 dark:text-slate-400">
            {colorValue}
          </div>
        </div>
      </div>
    </div>
  );
}
