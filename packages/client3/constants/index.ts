export * from "./contract-addresses";
export * from "./metadata/borrowers";

export { default as POOL_METADATA } from "./metadata/index";

const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME as string;
if (!networkName) {
  throw new Error("Network name is not defined in env vars");
}
export const DESIRED_CHAIN_ID =
  networkName === "mainnet"
    ? 1
    : networkName === "aurora_testnet"
    ? 1313161555
    : networkName === "aurora_mainnet"
    ? 1313161554
    : 31337;

export const USDC_DECIMALS = 6;
export const GFI_DECIMALS = 18;
export const FIDU_DECIMALS = 18;
export const CURVE_LP_DECIMALS = 18;

export const TRANCHES = {
  Senior: 1,
  Junior: 2,
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_GCLOUD_FUNCTIONS_URL
  ? process.env.NEXT_PUBLIC_GCLOUD_FUNCTIONS_URL
  : networkName === "mainnet"
  ? "https://us-central1-free-artists.cloudfunctions.net"
  : networkName === "aurora_mainnet"
  ? "https://us-central1-free-artists.cloudfunctions.net" //! CHANGE ME TO THE PRODUCTION INSTANCE
  : networkName === "aurora_testnet"
  ? "https://us-central1-free-artists.cloudfunctions.net"
  : "http://localhost:5001/goldfinch-frontends-dev/us-central1";

// TODO: Persona config needs to be updated to Production
type PersonaConfig = {
  templateId: string;
  environment: "sandbox" | "production";
};

export const PERSONA_CONFIG: PersonaConfig =
  process.env.NEXT_PUBLIC_PERSONA_TEMPLATE &&
  process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT
    ? ({
        templateId: process.env.NEXT_PUBLIC_PERSONA_TEMPLATE,
        environment: process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT,
      } as PersonaConfig)
    : networkName === "mainnet"
    ? {
        templateId: "tmpl_vD1HECndpPFNeYHaaPQWjd6H",
        environment: "production",
      }
    : {
        templateId: "tmpl_vD1HECndpPFNeYHaaPQWjd6H",
        environment: "sandbox",
      };

export const SERVER_URL =
  networkName === "mainnet"
    ? ""
    : networkName === "aurora_mainnet"
    ? "https://us-central1-free-artists.cloudfunctions.net" //! CHANGE ME TO THE PRODUCTION INSTANCE
    : networkName === "aurora_testnet"
    ? "https://us-central1-free-artists.cloudfunctions.net"
    : "http://localhost:4000";

export const UNIQUE_IDENTITY_SIGNER_URL =
  networkName === "aurora_mainnet"
    ? "https://api.defender.openzeppelin.com/autotasks/8320d42c-98bb-4b53-94e1-aad0628a0892/runs/webhook/356c72eb-f56c-443a-90c3-2b6040ee76b8/E4m9oGprLmtMba6GELSPcS" //! CHANGE ME TO THE PRODUCTION INSTANCE
    : networkName === "aurora_testnet"
    ? "https://api.defender.openzeppelin.com/autotasks/8320d42c-98bb-4b53-94e1-aad0628a0892/runs/webhook/356c72eb-f56c-443a-90c3-2b6040ee76b8/E4m9oGprLmtMba6GELSPcS"
    : "https://api.defender.openzeppelin.com/autotasks/8320d42c-98bb-4b53-94e1-aad0628a0892/runs/webhook/356c72eb-f56c-443a-90c3-2b6040ee76b8/E4m9oGprLmtMba6GELSPcS";

export const UNIQUE_IDENTITY_MINT_PRICE = "830000000000000";

export const TOKEN_LAUNCH_TIME = 1641920400; // Tuesday, January 11, 2022 09:00:00 AM GMT-08:00 (note that this number is in seconds, not ms)
