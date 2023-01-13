# Documentation

## TL;DR

Click here for video:
[![Free Artists Demo](https://raw.githubusercontent.com/weavik/free-artist-dao/main/packages/client3/public/FAD-logo-full.png)](https://drive.google.com/file/d/1vbHNQemQrAoY2_h6xe5km95atCIhGL1c/view?usp=share_link)

[Free Artists Application](https://freeartists-dev.vercel.app/)
[GitHub Repository](https://github.com/weavik/free-artist-dao)
[Subgraph](https://thegraph.com/hosted-service/subgraph/freeartists/free-artists-aurora-testnet)
[Google Cloud Functions](https://console.firebase.google.com/u/1/project/free-artists/firestore/data/~2Fagreements~2F0x240fbd2ee1febd506e3f15fe6eb313643225d3b7-0x108cc3833cd49333a7908e4bb52f4cf8f4090425)
[Google FireStore (database)](https://console.firebase.google.com/u/1/project/free-artists/firestore/data/~2Fagreements~2F0x240fbd2ee1febd506e3f15fe6eb313643225d3b7-0x108cc3833cd49333a7908e4bb52f4cf8f4090425)
[Vercel (application hosting/deployment](https://vercel.com/freeartists/freeartists-dev)
[Figma Designs](https://www.figma.com/file/g7Edk2JCOMLpRAw9v8NJ4c/FA-Product-Wireframe---working-file?node-id=2%3A148)

### Authentication for Services:

**_This note will destruct once read. Please copy the information before closing the note_**

> https://privnote.com/w5rKKjWh#KVYPFDr5g

## Contract Address ([Aurora Scanner](https://testnet.aurorascan.dev/))

**USDC**: 0x3E0B09aDf6171F5D1aefef567BA6Cf1fb364E080

**SeniorPool**: 0xCc67DeE4a4aFf88F89FfbCbC061E7eCa72f03D63

**GFI**: 0x1e5Ab4d3F3b673e6f2DE6e476149723ca4dB1649

**Fidu**: 0x8F43Fe6670222Dbe0D4F9aaC65C79bb379c9b401

**UniqueIdentity**: 0xCc78cd15d8A0aa9Fececb105A526b773e0789a61

**Go**: 0x171e7405B3F0117Fbe29F3ADa4144cEBfF33287

**StakingRewards**: 0x409929269e47c8a1F5d0Dd54a51A1128f440737

**Zapper**: 0xF085CaFFfD0D22371eD4B1Bc90c3F5B3f2cb100

**CommunityRewards**: 0xC467384310CBeFb256BAcDB72A4182516d0169e

**BackerRewards**: 0x7928feC16DB5b216aAb76e093453324a1bE3983

**GoldfinchFactory**: [0xe2803904a00C26406ed79dd526A61b03207054b5](https://testnet.aurorascan.dev/address/0xe2803904a00C26406ed79dd526A61b03207054b5

**GoldfinchConfig**: 0x9d64Ba30d699507BbC84628417B7A4fF4bdb856

**Borrower**: 0x944453e6b95575572D262dA8dd065e6776A1832

**PoolTokens**: 0x0443997dD4F6deEFDAb42794F7DE07b4B520D8C

**Relay ([documentation](#autotasks))**: [0x25190908c3e1c75be8f5cb248425d8c09ed02e22](0x25190908C3e1C75bE8f5cb248425D8C09ED02E22)

## Admins

Free Artist Wallet: [0x86D637d8EB368BC61E4A2111D11050B299B2de2c](0x86D637d8EB368BC61E4A2111D11050B299B2de2c)

## Background (Goldfinch Overview)

Free Artists is a fork of the [Goldfinch Repository](https://github.com/goldfinch-eng/mono). The Goldfinch Platform attempts to address a gap in lending where a borrower looking to raise capital must provide collateral for a loan. Goldfinch does not require a "borrower" to provide collateral for their loan. Instead, the protocol creates a mechanism for the borrower to show their "creditworthiness" by having other participants within the protocol to assess the borrower.

The Free Artists application uses Goldfinch's [production frontend (`client2`)](https://github.com/weavik/free-artist-dao/tree/main/packages/client3). The Goldfinch contracts are deployed currently on the [Aurora Testnet Chain](https://testnet.aurora.dev/)

Resources:
[Goldfinch White Paper](https://uploads-ssl.webflow.com/62d551692d521b4de38892f5/631146fe9e4d2b0ecc6a3b97_goldfinch_whitepaper.pdf)
Free Artists White Paper - ask the Free Artists team

## Getting Started

#### [`packages`](https://github.com/weavik/free-artist-dao/tree/main/packages)

- The main parent directory for the application.

#### [`autotasks`](https://github.com/weavik/free-artist-dao/tree/main/packages/autotasks)

- Tasks that can be deployed by using Open Zeppelin's Relays and Autotasks to execute core functionality, including Know Your Customer (KYC). See [Autotasks & Relays](#autotasks-&-relay).

#### [`client`](https://github.com/weavik/free-artist-dao/tree/main/packages/client "client")- referred to as "client1"

This is the original frontend for Goldfinch and is no longer in production. Notably, this [instance](https://d2dq341cbfldko.cloudfront.net/) of Free Artists uses `client1`. If the application is running locally, `client1` will be available on `localhost:3000` if the `client3`'s [ports are changed](https://github.com/weavik/free-artist-dao/blob/main/packages/client3/package.json). The port for `client3`'s api will also need to be changed to match the port used.

#### [`client2`](https://github.com/weavik/free-artist-dao/tree/main/packages/client2)

- Goldfinch's current production build. This was used as a reference for `client3`.

#### [`client3`](https://github.com/weavik/free-artist-dao/tree/main/packages/client3)

- Weavik's development team's Free Artists development. Change the `.env.local` appropriately.

#### [`functions`](https://github.com/weavik/free-artist-dao/tree/main/packages/functions)

- Google cloud functions that have been deployed [here](https://console.firebase.google.com/u/1/project/free-artists/firestore/data/~2Fagreements~2F0x240fbd2ee1febd506e3f15fe6eb313643225d3b7-0x108cc3833cd49333a7908e4bb52f4cf8f4090425)
- To redeploy functions, follow the [README.md](https://github.com/weavik/free-artist-dao/blob/main/packages/functions/README.md), authenicate the firebase account, and run `firebase deploy --only functions` (you can update a particular function with `--only functions:<function name>`

#### [`protocol`](https://github.com/weavik/free-artist-dao/tree/main/packages/protocol)

- Includes the [Goldfinch contracts](https://github.com/weavik/free-artist-dao/tree/main/packages/protocol/contracts), runs the [Hardhat development environment locally](https://github.com/weavik/free-artist-dao/blob/main/packages/protocol/hardhat.config.base.ts), [provides deployment scripts](https://github.com/weavik/free-artist-dao/blob/main/packages/protocol/deploy/baseDeploy.ts), and [previous deployments](https://github.com/weavik/free-artist-dao/tree/main/packages/protocol/deployments)

#### [`server`](https://github.com/weavik/free-artist-dao/tree/main/packages/server)

- Used locally only. Provides functionality for [`setupForTesting`](https://github.com/weavik/free-artist-dao/blob/main/packages/protocol/deploy/setUpForTesting.ts).

#### [`subgraph`](https://github.com/weavik/free-artist-dao/tree/main/packages/subgraph)

- A `subgraph` can be run locally and accessed at `localhost:8000`.

## [Setup Locally](https://github.com/weavik/free-artist-dao#setup)

1.  Run `make setup` to quickly setup development environment (env files, git hooks, etc).
2.  **root env**: Substitute `TEST_USER` for your wallet address. Add your `private key` here as well so the [hardhat config](https://github.com/weavik/free-artist-dao/blob/main/packages/protocol/hardhat.config.base.ts) can deploy the contracts locally with your account as admin.
3.
4.  TL;DR to setup the protocol and subgraph:
    - Run `make protocol` then `make graph`
      - if you get a `ERCONNECT` with `make graph`, run `reset_graph` and start at 5.5 (5.a in the `README.md` preview)
5.  If above fails:
    1.  Start with fresh install, setup the env files before anything here. `nvm use && npm install && npm run bootstrap` this will take some time
    2.  start client (1) / protocol `npm run start:local`
    3.  open a new terminal (`nvm use` every time you open a new terminal)
    4.  `cd packages/subgraph`
    5.  `npm run start-local` this can take a few minutes
    6.  `npm run create-local` will throw an error if previous was not completed...
    7.  `npm run deploy-local` this will take some time
    8.  `cd ..`
    9.  `cd client3`
    10. `npm run dev`

## [Autotasks & Relay](https://docs.openzeppelin.com/defender/autotasks)

Free Artists uses Open Zeppelin's [Relays](https://docs.openzeppelin.com/defender/relay) and [Auotasks](https://docs.openzeppelin.com/defender/autotasks). An Autotasks allows for the on-chaining minting of tokens. This functionality is most notably used in the minting of the Unique Identity Token that gets associated with an artist's or backer's wallet.

The [Aurora Testnet Relay](https://testnet.aurorascan.dev/address/0x25190908c3e1c75be8f5cb248425d8c09ed02e22) executes the `unique-identity-signer` [Google Cloud Function](https://us-central1-free-artists.cloudfunctions.net/linkUserToUid). This allows the user to claim their UID and link it to their account.

Resources:

- [Open Zeppelin Documentation](https://defender.openzeppelin.com/#/autotask)
- [Autotask Code](https://github.com/weavik/free-artist-dao/tree/main/packages/autotasks/unique-identity-signer)
- [Aurora Testnet Relay](https://testnet.aurorascan.dev/address/0x25190908c3e1c75be8f5cb248425d8c09ed02e22)

## Interplanetary File System

- The Interplanetary File System is a decentralized file system where users can deploy their own [nodes](https://docs.ipfs.tech/install/), provide a portion of their file system to host a cluster's data, and in turn store their files on other nodes within the IPFS network.
- `client3` uses two IPFS nodes. The first is within the [`subgraph` docker stack](https://github.com/weavik/free-artist-dao/blob/main/packages/subgraph/docker-compose.yml), and the second is a [node](https://github.com/weavik/free-artist-dao/blob/main/packages/client3/ipfs/docker-compose.yaml) that uploads the application's files to the IPFS network.
- The IPFS UI can be accessed locally at `localhost:8081`

Resources:

- [IPFS Documentation](https://docs.ipfs.tech/)

## Subgraph & Graph

- The Graph is an indexing protocol for querying various networks. Users can deploy [`subgraphs`](https://thegraph.com/explorer) that reference particular contract addresses. The subgraph is essentially a replacement for the traditional Web2 api.
- The subgraph can be deployed with this [config](https://github.com/weavik/free-artist-dao/blob/main/packages/subgraph/subgraph.yaml).

## [Persona](https://withpersona.com/) and UID Tokens

- The Goldfinch (and Free Artists) platform uses Persona to verify a user's identity. This allows an artist to raise capital from select users who have a verified identity, determine if they want individual investors or entities, or to segment their investors regionally (USA or non-USA). Unique Identity (UID) Tokens are minted using Open Zeppelin Autotasks.
- There is a [`personaCallback` function](https://console.firebase.google.com/u/1/project/free-artists/functions) that receives the Know Your Customer (KYC) result from Persona. The Autotask references this information in the [Firestore Database](https://console.firebase.google.com/u/1/project/free-artists/firestore) to determine if a token can be minted or not.

Resources:

- [UID Documentation](https://docs.goldfinch.finance/goldfinch/unique-identity-uid)

## Future Considerations

1.  Next Steps
    - [Artist Withdrawal](https://www.figma.com/file/g7Edk2JCOMLpRAw9v8NJ4c/FA-Product-Wireframe---working-file?node-id=94%3A10972)
      - Figma designs are complete.
      - Additional CTA buttons and flows include Unlocking USDC, Locking a Pool, and Withdrawing, as well as visual indicators of previous withdrawals.
      - UI has not been developed.
    - [Artist Repayment](https://www.figma.com/file/g7Edk2JCOMLpRAw9v8NJ4c/FA-Product-Wireframe---working-file?node-id=94%3A10972)
      - Figma designs are complete.
      - One additional component needs to be developed for Depositing Revenue.
    - [Backer Withdrawal](https://www.figma.com/file/g7Edk2JCOMLpRAw9v8NJ4c/FA-Product-Wireframe---working-file?node-id=1588%3A24237)
      - Figma designs are complete.
      - Additional backer flows include seeing available withdrawals, previous withdrawal history (linking externally to etherscan), and enabling the Withdrawal itself.
      - UI not yet implemented.
2.  Limitations with Vercel Deployment
    - The Free Artist platform has been deployed using [Vercel](https://vercel.com/dashboard). However, the [file uploader](https://github.com/weavik/free-artist-dao/blob/main/packages/client3/ipfs/README.md) is an [IPFS node](#interplanetary-file-system) using [Docker](https://github.com/weavik/free-artist-dao/blob/main/packages/client3/ipfs/docker-compose.yaml). Vercel does not offer computing services to host Docker containers.
3.  Quality Assurance Testing
    - This repository has not been tested for quality assurance and this code is for development purposes only. Weavik's Development team has only completed a "Happy Path" test of the application. This means that we have only tested the application for the most basic functionality. We have not tested for edge cases, bugs, or other issues that may arise.

# Depoloyments

## Deploy Contracts:

- Run this command: `npx hardhat deploy --network aurora --export-all deployments/all.json`
  - Networks are from your `hardhat.config.base.ts` file.
  - Make sure `deployEffects.executeDeferred()`. If execute deferred is not completed, restart the deployment.
  - If contracts do fail, remove the "failed" deployments from the `deployments/all.json` file.

## Deploy Vercel

- Make sure the staging branch is up to date.
- Make sure the Vercel project environment is correct - [see here](https://vercel.com/freeartists/freeartists-dev/settings/environment-variables)
- Install the [Vercel CLI](https://vercel.com/docs/cli)
- Run `vercel` in the `client3` directory of the project.
- Enter in the credentials for the Vercel account (get Chris/Harrison to approve you).
- Run:

```bash
# run "vercel pull" if you just updated the environment.
vercel build
```

- The return should look something like:

```nano
Vercel CLI 28.10.0
🔍 Inspect: https://vercel.com/freeartists/freeartists-dev/21pKnFwM8YN1MoobXDk26ApTk6Hd [15s]
✅ Preview: https://freeartists-dev-freeartists.vercel.app [2m]
📝 To deploy to production (freeartists-dev.vercel.app), run `vercel --prod`
❗️ Ignoring function property `includeFiles`. When using Next.js, only `memory` and `maxDuration` can be used.
Learn More: https://vercel.link/functions-property-next
```

- If the build is successful and correct, run `vercel --prod` to deploy to production.

## Troubleshooting

Click [here](https://github.com/weavik/free-artist-dao#troubleshooting-1) for the Weavik team's troubleshooting docs.

## Videos

- [Create Pool](https://user-images.githubusercontent.com/98773781/196561274-724e0df1-8944-4078-babe-28dba2cc584f.mov)
- [KYC/UID](https://free-artists.slack.com/files/U03UN2XSJMC/F04F09NDJTH/2022-12-15_12-22-33.mp4)

## Deployment Lifecycle

- [x] Add the networks to the `hardhat.config.base.ts` file.
- [x] Add network information here `packages/protocol/blockchain_scripts/deployHelpers/index.ts`
- [x] Make sure that USDC coin address is correct here: `packages/protocol/blockchain_scripts/baseDeploy/getOrDeployUSDC.ts`
- [x] Run `npx hardhat deploy --network <hardhat-network> --export-all deployments/all.json`
  - e.g., `npx hardhat deploy --network aurora_testnet --export-all deployments/test_deploy.json`
  - e.g., `npx hardhat deploy --network aurora_prod --export-all deployments/all.json`
- [x] Update client3 environment
  - `packages/client3/scripts/populate-contract-addresses.ts` and `packages/client3/env.local`
- [x] Create/Update Subgraph
  - `graph deploy --product hosted-service freeartists/free-artists-production aurora_mainnet_subgraph.yaml`
- [x] Deploy GCP Functions
  - Depending on the deployment consider making a new firebase project to seperate concerns.
  - `cd packages/functions && firebase deploy` <---this deploys firebase and functions
  - To update functions run, `cd packages/functions && firebase deploy --only functions`
- [x] Create GCP config
- [x] Create a Defender Relay and add API key to: `.env.local`
- [x] Deploy Autotask and Relay
  - e.g., `cd packages/autotask && npm run deploy`
- [x] Grant Admin privileges to Autotask relay
- [x] Add UID types to Unique Identity Provider
- [x] Redeploy GCP functions
