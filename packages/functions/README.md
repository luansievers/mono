# Overview

If you want to use the command-line examples in this guide, install the `gcloud` command-line tool. https://cloud.google.com/sdk/docs/install or use homebrew `brew install --cask google-cloud-sdk`.

## Updating config settings
For a given cloud function, one way to see what is the config setting’s value is to go to the [cloud console]("https://console.cloud.google.com/functions/details/us-central1/kycStatus?env=gen1&project=goldfinch-frontends-prod&tab=source"), view/download the source code of the cloud function, and then view the .runtimeconfig.json file in that bundle.

## gcloud commands

For <projects> use `goldfinch-frontends-prod` or `goldfinch-frontends-dev`

Docs: https://cloud.google.com/deployment-manager/runtime-configurator
SDK Docs: https://cloud.google.com/sdk/gcloud/reference/beta/runtime-config/configs

`gcloud help`

`gcloud auth login`

`gcloud beta runtime-config configs list --project free-artists`

If not config is returned, create one: 
`gcloud beta runtime-config configs create free-artists --description free-artists`

`gcloud beta runtime-config configs create kyc --description free-artists`

List variables
`gcloud beta runtime-config configs variables list --config-name kyc --values --project free-artists`

Example get variables
`gcloud beta runtime-config configs variables get-value allowed_origins --config-name kyc --project free-artists`

Example set variable `--is-text` is a needed param
`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,https://freeartists-dev.vercel.app" --config-name kyc --project free-artists --is-text`

NOTE: If you want to be able to use the remote cloud functions when running locally, then `http://localhost:3000` should be included as one of those allowed origins ^^^.


`gcloud beta runtime-config configs variables set allowed_origins "https://app.goldfinch.finance,https://beta.app.goldfinch.finance,https://deploy-preview-*--goldfinchfi.netlify.app,http://localhost:3000,https://freeartists-dev.vercel.app" --config-name free-artists --project free-artists --is-text`


## Troubleshooting

- Deploying cloud functions, make sure your checksum values are correct.
    - If you do get a checksum error, delete directories `functions/node_modules`, `functions/package-lock.json`, the `goldfinch-eng-pool-x.x.x.tgz`, the `protocol/cache` directory, **change the**:
```
    "@goldfinch-eng/pools": "file:./goldfinch-eng-pools-0.0.0.tgz",
    "@goldfinch-eng/protocol": "file:./goldfinch-eng-protocol-0.1.0.tgz",
    "@goldfinch-eng/utils": "file:./goldfinch-eng-utils-0.0.1.tgz",
```
back to:
```
    "@goldfinch-eng/pools": "^0.0.0",
    "@goldfinch-eng/protocol": "^0.1.0",
    "@goldfinch-eng/utils": "^0.0.1",
```
  - then rerun `make protocol`. Wait until the `goldfinch-eng-pool-x.x.x.tgz` are generated. Double check the values in the `package.json` have reverted back to the `file: ....` Then try to redeploy the cloud functions.
      - If they have not reverted back to the `file: ....`, run `npm run pre-deploy`. 
      - 
