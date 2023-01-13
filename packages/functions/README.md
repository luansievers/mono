# Overview

If you want to use the command-line examples in this guide, install the `gcloud` command-line tool. https://cloud.google.com/sdk/docs/install or use homebrew `brew install --cask google-cloud-sdk`.

## Get Started

https://firebase.google.com/docs/functions/get-started

## Updating config settings
For a given cloud function, one way to see what is the config setting’s value is to go to the [cloud console]("https://console.cloud.google.com/functions/details/us-central1/kycStatus?env=gen1&project=goldfinch-frontends-prod&tab=source"), view/download the source code of the cloud function, and then view the .runtimeconfig.json file in that bundle.

## gcloud commands

For <projects> use `goldfinch-frontends-prod` or `goldfinch-frontends-dev`

Docs: https://cloud.google.com/deployment-manager/runtime-configurator
SDK Docs: https://cloud.google.com/sdk/gcloud/reference/beta/runtime-config/configs


`gcloud help`

`gcloud auth login`

`gcloud beta runtime-config configs list --project free-artists`
`gcloud beta runtime-config configs list --project free-artists-production`

If not config is returned, create one: 
`gcloud beta runtime-config configs create free-artists --description free-artists`
`gcloud beta runtime-config configs create free-artists --project free-artists-production --description free-artists`

`gcloud beta runtime-config configs create kyc --description free-artists`
`gcloud beta runtime-config configs create kyc --project free-artists-production --description free-artists-production`

List variables
`gcloud beta runtime-config configs variables list --config-name kyc --values --project free-artists`
`gcloud beta runtime-config configs variables list --config-name kyc --values --project free-artists-production`

Example get variables
`gcloud beta runtime-config configs variables get-value allowed_origins --config-name kyc --project free-artists`
`gcloud beta runtime-config configs variables get-value allowed_origins --config-name kyc --project free-artists-production`

Example set variable `--is-text` is a needed param
`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,https://freeartists-dev.vercel.app" --config-name kyc --project free-artists --is-text`

`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,localhost:3001,https://freeartists-dev.vercel.app" --config-name kyc --project free-artists-production --is-text`

`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,localhost:3001,https://freeartists-dev.vercel.app" --config-name free-artists --project free-artists-production --is-text`

NOTE: If you want to be able to use the remote cloud functions when running locally, then `http://localhost:3000` should be included as one of those allowed origins ^^^.


`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,https://freeartists-dev.vercel.app" --config-name free-artists --project free-artists --is-text`


### Set Function Environment:
- https://cloud.google.com/functions/docs/configuring/env-var
- Probably look like: `firebase deploy --only functions --set-env-vars AURORA_TESTNET=yes`
- ON NEW DEPLOYS:
    - If you're getting a 403 error when you try and load client3, make sure to set the permissions on the functions correctly. Please reference these [docs](https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_function_invocation) and reference these [permissions](https://console.cloud.google.com/functions/list?authuser=1&project=free-artists), notably the Authentication --> "Cloud Function Invoker", which would be `allUsers`.
