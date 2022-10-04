import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";

import { themes } from "@storybook/theming";
import { DocsContainer } from "./DocsContainer";
import { useDarkMode } from "storybook-dark-mode";
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { WalletProvider } from "@/lib/wallet";
import { apolloClient } from "@/lib/graphql/apollo";
import { ApolloProvider } from "@apollo/client";
import { AppWideModals } from "@/lib/state/app-wide-modals";

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
  nextRouter: {
    Provider: RouterContext.Provider, // To support next router within storybook
  },
};

export const decorators = [
  (Story) => (
    <div className={useDarkMode() ? themes.dark.className : "light"}>
      <WalletProvider>
        <ApolloProvider client={apolloClient}>
          <AppWideModals />
          <Story />
        </ApolloProvider>
      </WalletProvider>
    </div>
  ),
];

/**
 * This was added to handle Next Images within storybook
 * @source : https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
 */
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
