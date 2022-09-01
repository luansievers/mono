# red color environment
RED='\033[0;31m'
NC='\033[0m'


# Handle node version
node_version=`node -v`
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

if [ "$node_version" != "v16.15.1" ]; then
  echo $node_version
  nvm install 16.15.1
fi

export $(grep -v '^#' .env.local | xargs)
if [ "$TEST_USER" = "{{ADD_YOUR_METAMASK_ADDRESS_HERE}}" ]; then
  echo $TEST_USER
  echo "Please add your metamask address to .env.local and review the README.md"
  exit 1
fi

export $(grep -v '^#' packages/client3/.env.local | xargs)
if [ "$NEXT_PUBLIC_NETWORK_NAME" = "mainnet" ]; then
  echo $NEXT_PUBLIC_NETWORK_NAME
  echo "${RED}Double check that you want to go to mainnet"
  # ask to proceed
  read -p "Are you sure you want to go to mainnet? (y/n) " -n 1 -r
  echo    # (optional) move to a new line
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "${NC}Proceeding to mainnet"
  else
    echo "Exiting"
    exit 1
  fi
fi

export $(grep -v '^#' packages/client3/.env.local | xargs)
if [ "$NEXT_PUBLIC_MAINNET_RPC_URL" = "https://eth-mainnet.alchemyapi.io/v2/<YOUR API KEY>" ]; then
  echo $NEXT_PUBLIC_MAINNET_RPC_URL
  echo "Please add your alchemyapi key to the packages/client3/.env.local"
  exit 1
fi

nvm use

nvm use && npm install && npm run bootstrap

npm --prefix packages/subgraph run start-local
npm --prefix packages/subgraph run create-local
npm --prefix packages/subgraph run deploy-local
npm --prefix packages/client3 run dev
