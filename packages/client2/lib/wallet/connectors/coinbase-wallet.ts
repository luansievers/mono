import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

import { DESIRED_CHAIN_ID } from "@/constants";

import { RPC_URLS } from "../chains";

export const [coinbaseWallet, coinbaseWalletHooks] =
  initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet(actions, {
        appName: "Goldfinch",
        url: RPC_URLS[DESIRED_CHAIN_ID],
        appLogoUrl:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMTIiIGZpbGw9IiNGMUVGRUQiIHN0cm9rZT0iI0Q2RDFDQyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPHBhdGggZD0iTTE2LjI3OTEgOC42NzkwNEMxNi4wMTU5IDguOTY5NzcgMTUuNDA1NiA4Ljk2MzU4IDE1LjE0NTUgOC42OTkxN0MxNC44ODU0IDguNDM0NzYgMTQuODAxIDcuOTI1MjkgMTUuMTUxNSA3LjYwNTgyQzE1LjUwMjEgNy4yODYzNCAxNi4wMjQ2IDcuNDA2NDMgMTYuMjg0OCA3LjY0MTYyQzE2LjU0NTEgNy44NzY4MSAxNi41NDIzIDguMzg4MyAxNi4yNzkxIDguNjc5MDRaIiBmaWxsPSIjNDgzRTVFIi8+CjxwYXRoIGQ9Ik0xMy41NDQ1IDYuNTc2MTFDMTMuMjU3MSA2LjkyNDUzIDEzLjE0NTEgNy4xMjc3OCAxMi45MjY1IDcuNjg0NDhDMTIuNjQzMyA4LjQwNTg5IDEyLjM4NzggOS4yMDI3NyAxMi4yODMxIDkuNjk2MzJDMTIuMTc4NCAxMC4xODk5IDEyLjM3OTIgMTAuNjE1NCAxMi44NDA3IDEwLjkwNzNDMTMuMzI4OSAxMS4yMTYgMTMuODU1NiAxMS40NTcyIDE0LjU2OCAxMS43Mjg4QzE1LjI4MDQgMTIuMDAwNCAxNS43OTA1IDEyLjM4NDggMTUuOTUxNSAxMi43NzY4QzE2LjExMjUgMTMuMTY4OSAxNi4wNzEzIDEzLjkyMiAxNS43MDAyIDE0LjY0MDVDMTUuMzI5MSAxNS4zNTkxIDE0LjgxMzcgMTYuMDI1OSAxMy45MTI2IDE2LjY3OTdDMTMuMDExNiAxNy4zMzM2IDEyLjM5NzcgMTcuNDg2OCAxMS41MDkxIDE3LjY4NzhDMTAuNjIwNSAxNy44ODg4IDEwLjkwOTIgMTguMzk3NyAxMS4yMTQ1IDE4LjUwMjNDMTEuNTE5OSAxOC42MDcgMTIuMTkyNCAxOC43MTM2IDEzLjA5MDEgMTguNjc3NEMxMy45ODc4IDE4LjY0MTIgMTQuODg1NCAxOC40MTk2IDE1Ljk0ODkgMTcuODkwMkMxNy4wMTI1IDE3LjM2MDggMTguMDU3OCAxNi40NDAxIDE4LjYxNjUgMTUuMjA3OEMxOS4xNzUxIDEzLjk3NTYgMTkuNDA0OCAxMi4yMzQgMTguNzcxNCAxMS4xMzIxQzE4LjQwMzQgMTAuNDkxOSAxOC4yMTM5IDEwLjMzNzIgMTguMDkzNyA5LjkzNDI4QzE3Ljk3MzYgOS41MzE0IDE4LjA1MzYgOS4yMjUzNCAxOC4yODMxIDguOTQ3MDdDMTguNDE1NCA4Ljc4NjYzIDE4LjcxMDEgOC42MjU5OSAxOC45ODAzIDguNDMzNDRDMTkuMTkzMiA4LjI4MTY4IDE5LjQ0OTkgOC4xMjk5NyAxOS42MzQxIDguMDA3NDZDMTkuODE4NCA3Ljg4NDk0IDE5Ljg4MTEgNy44MjA3NiAxOS43NTkyIDcuNzM3NzNMMTkuNzU0OCA3LjczNDc2QzE5LjYzMTUgNy42NTA3NSAxOS4zODg0IDcuNDg1MTYgMTguOTY0OCA3LjMyNDM0QzE4LjUzNjIgNy4xNjE2IDE4LjQ1NTQgNy4xMzkwOSAxOC4yOTMyIDcuMTI1MDlDMTguMTMwOSA3LjExMTA5IDE3LjkyNjEgNy4yNTQwOCAxNy41OTg0IDcuNDk5MzNDMTcuMjcwNyA3Ljc0NDU4IDE3LjEyNzcgNy43OTIwNCAxNy4xMDU3IDguMDczMDlDMTcuMDgzOCA4LjM1NDE0IDE3LjAwMDIgOC43MTA3NSAxNi43NzQyIDkuMDE4MzNDMTYuNTQ4MSA5LjMyNTkyIDE2LjI0NjUgOS40ODEwNSAxNS44NDM2IDkuNTE5NjRDMTUuNDQwNiA5LjU1ODIzIDE0Ljg5NjggOS40MzAyNSAxNC42MzA4IDkuMTEyMjFDMTQuMzY0OCA4Ljc5NDE3IDE0LjI1NzkgOC42MTMwMyAxNC4yNjA0IDguMTY0MTJDMTQuMjYyOCA3LjcxNTIxIDE0LjQzNzQgNy4zOTk1MyAxNC42Njg1IDcuMTc0MzNDMTQuODk5NiA2Ljk0OTEzIDE0Ljg4OTEgNi44NjY3MiAxNC44ODk3IDYuNzYzNzhDMTQuODkwMyA2LjY2MDg0IDE0LjgzODggNi4zMTAzOSAxNC43OTUgNi4xNDY5QzE0Ljc1MTIgNS45ODM0MSAxNC41OTEgNS45NTY4MyAxNC4zMjg4IDYuMDQxMzFDMTQuMDU0MiA2LjEyOTc3IDEzLjgzMiA2LjIyNzY5IDEzLjU0NDUgNi41NzYxMVoiIGZpbGw9IiM0ODNFNUUiLz4KPHBhdGggZD0iTTkuNDUzMzggMTUuMTQ2MkM5LjMyMTAyIDE1LjE4MDMgOS4yMjcwOCAxNS40MDY1IDguOTY1MTIgMTUuODU4NkM4LjcwMzE3IDE2LjMxMDcgOC40NTc5MiAxNi42NDA3IDcuOTkwNjggMTcuMTQ0QzcuNTIzNDMgMTcuNjQ3MyA3LjIzMDUyIDE3Ljg1NSA2LjQ4OTE4IDE4LjMwNDRMNi40NzAwNCAxOC4zMTZDNS43NDQxIDE4Ljc1NjEgNS41MzA1OSAxOC44ODU1IDUuNDc5NjUgMTkuMDE5NUM1LjQyODI2IDE5LjE1NDcgNS40NTcwNiAxOS4zMzM0IDUuOTk5NzMgMTkuNDIwMUM2LjU0MjQgMTkuNTA2OSA2Ljk5NTA4IDE5LjUyODIgNy43ODI2NiAxOC45OTE4QzguNTcwMjMgMTguNDU1NCA5LjE4OTU4IDE3LjkzNTUgMTAuMDA0NyAxNy41NTYzQzEwLjgxOTcgMTcuMTc3MSAxMS4wNzQxIDE3LjIwMjYgMTEuOTg2MiAxNi45MzkzQzEyLjg5ODMgMTYuNjc2IDEzLjczMTMgMTYuMTU0MSAxNC4zMDc3IDE1LjUxNzVDMTQuODg0IDE0Ljg4MDggMTUuMTc0IDE0LjIzNzYgMTUuMjkyIDEzLjg3MThDMTUuNDEgMTMuNTA2IDE1LjQyOTIgMTMuMDE3OCAxNS4xMjA3IDEyLjc3MTlDMTQuODI1OSAxMi41MzY5IDE0LjY2NjQgMTIuNDY1OSAxNC4wMTQzIDEyLjIxOEMxMy4zMjA5IDExLjk1NDUgMTMuMDkwNSAxMS44ODgxIDEyLjU4MDggMTEuNDc4M0MxMi4xMDA1IDExLjA5MiAxMi4xMjk2IDExLjAwMDUgMTEuODI2NyAxMC45NTgxQzExLjUyMzggMTAuOTE1NyAxMS4yOTE1IDExLjM2NzkgMTEuMTg3OSAxMS41OTQ0QzExLjExIDExLjc2NDggMTEuMDk1MiAxMi4wNjYzIDExLjI5NzUgMTIuMzUxM0MxMS40OTk3IDEyLjYzNjMgMTEuNjg3NSAxMi45NDk4IDEyLjI0NCAxMy4yNzAxQzEyLjgwMDQgMTMuNTkwMyAxMy4wNjAzIDEzLjY0MjUgMTMuNDQwNSAxMy43MDhDMTMuODIwOCAxMy43NzM2IDEzLjk2ODkgMTMuODY0NSAxMy44NjU2IDE0LjA0NDZDMTMuNzYyMyAxNC4yMjQ3IDEzLjU1NzMgMTQuMzExMiAxMy4yMDk1IDE0LjMwOTNDMTIuODYxNyAxNC4zMDc0IDEyLjM3MTYgMTQuMTQ0NiAxMS44ODIxIDEzLjg1M0MxMS41MzcgMTMuNjQ3MyAxMS4yOTEyIDEzLjQxNjMgMTEuMTEyIDEzLjE4ODNDMTAuOTM3OCAxMi45NjY2IDEwLjgzMjcgMTIuOTM0IDEwLjY3MDEgMTIuOTMzMUMxMC41MDc0IDEyLjkzMjIgMTAuMzczMSAxMy4wMzQ2IDEwLjE3NjkgMTMuMzIyNUM5Ljk4MDc4IDEzLjYxMDQgOS44MzU4MyAxMy45MjI2IDkuODE0NDQgMTQuMDkyQzkuNzkzMDQgMTQuMjYxNCA5Ljc3MzY0IDE0LjQ1MDQgMTAuMDc5MyAxNC42NzkxQzEwLjM4NDkgMTQuOTA3OCAxMC42NDk0IDE1LjAzMjcgMTAuOTk2OCAxNS4wOTY1QzExLjM0NDMgMTUuMTYwNCAxMS42MDgzIDE1LjI3MDUgMTEuMzUyMyAxNS41MDEyQzExLjA5NjMgMTUuNzMxOCAxMC43ODc3IDE1LjY3ODcgMTAuNTQyNiAxNS42MTU1QzEwLjI5NzQgMTUuNTUyMiA5Ljk0MjI1IDE1LjM1ODIgOS44MDc5MyAxNS4yNzAyQzkuNjczNjIgMTUuMTgyMyA5LjU4NTc0IDE1LjExMiA5LjQ1MzM4IDE1LjE0NjJaIiBmaWxsPSIjNDgzRTVFIi8+CjxwYXRoIGQ9Ik0xNy4yMDkxIDcuMDM5MzdDMTcuMzk0MyA2LjkyNTUyIDE3LjU5OTEgNi43NzU4NiAxNy41OTk3IDYuNjcwMzlDMTcuNjAwMyA2LjU2NDkyIDE3LjQ5NzEgNi40Mzc3OCAxNy4wNjIzIDYuMTYxMTVDMTYuNjI3NCA1Ljg4NDUyIDE2LjAyNjYgNS41Njk3NSAxNS42MzIgNS41MjA0MUMxNS4yMzc1IDUuNDcxMDYgMTUuNDA1MSA2LjA5OTM2IDE1LjQ1MDIgNi4zNDc3MUMxNS40OTU0IDYuNTk2MDcgMTUuNTA4MiA2Ljc4OTI5IDE1LjY3MjIgNi44MTAyNkMxNS44MzYxIDYuODMxMjIgMTUuOTU5MSA2Ljg1MTk1IDE2LjEwMjQgNi44OTI4NkMxNi4yNDU3IDYuOTMzNzYgMTYuNDI5OCA3LjAyMTI3IDE2LjYzNDMgNy4xNDI3NUMxNi44Mzg3IDcuMjY0MjIgMTcuMDIzOSA3LjE1MzIyIDE3LjIwOTEgNy4wMzkzN1oiIGZpbGw9IiM0ODNFNUUiLz4KPC9zdmc+Cg==",
      }),
    [DESIRED_CHAIN_ID]
  );
