import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";

import { themes } from "@storybook/theming";
import { DocsContainer } from "./DocsContainer";
import { useDarkMode } from "storybook-dark-mode";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // classTarget: "html",
    stylePreview: true,
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.light },
  },
  docs: {
    container: DocsContainer,
  },
};

export const decorators = [
  (Story) => (
    <div className={useDarkMode() ? themes.dark.className : "light"}>
      <Story />
    </div>
  ),
];
