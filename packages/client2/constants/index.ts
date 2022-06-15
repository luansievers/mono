export * from "./contract-addresses";
export * from "./metadata/borrowers";

export { default as POOL_METADATA } from "./metadata/index";

export const DESIRED_CHAIN_ID = parseInt(
  process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID as string
);
if (isNaN(DESIRED_CHAIN_ID)) {
  throw new Error("Desired chain ID is not defined properly in env vars");
}

export const USDC_DECIMALS = 6;
export const GFI_DECIMALS = 18;
export const FIDU_DECIMALS = 18;

export const TRANCHES = {
  Senior: 1,
  Junior: 2,
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_GCLOUD_FUNCTIONS_URL ||
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:5001/goldfinch-frontends-dev/us-central1"
    : process.env.NEXT_PUBLIC_ENV === "staging"
    ? "https://us-central1-goldfinch-frontends-dev.cloudfunctions.net"
    : "https://us-central1-goldfinch-frontends-prod.cloudfunctions.net";

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
    : process.env.NEXT_PUBLIC_ENV === "local"
    ? {
        templateId: "itmpl_LEMNg4MMLCKZgQy3jV9YjQuF",
        environment: "sandbox",
      }
    : process.env.NEXT_PUBLIC_ENV === "staging"
    ? {
        templateId: "tmpl_vD1HECndpPFNeYHaaPQWjd6H",
        environment: "sandbox",
      }
    : {
        templateId: "tmpl_vD1HECndpPFNeYHaaPQWjd6H",
        environment: "production",
      };

export const SERVER_URL =
  process.env.NEXT_PUBLIC_ENV === "local"
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_ENV === "staging"
    ? "https://murmuration.goldfinch.finance"
    : "";

export const UNIQUE_IDENTITY_SIGNER_URL =
  process.env.NEXT_PUBLIC_ENV === "local" ||
  process.env.NEXT_PUBLIC_ENV === "staging"
    ? `${SERVER_URL}/uniqueIdentitySigner`
    : "https://api.defender.openzeppelin.com/autotasks/bc31d6f7-0ab4-4170-9ba0-4978a6ed6034/runs/webhook/6a51e904-1439-4c68-981b-5f22f1c0b560/3fwK6xbVKfeBHZjSdsYQWe";

export const UNIQUE_IDENTITY_MINT_PRICE = "830000000000000";
