# red color environment
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'


# Handle node version
node_version=`node -v`
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

if [ "$node_version" != "v16.15.1" ]; then
  echo $node_version
  nvm install 16.15.1
fi
# set python version
python_version=`python -V`

if [ "$python_version" != "Python 3.10.4" ]; then
  echo $python_version
  pyenv install 3.10.4
  pyenv global 3.9.7
fi
pyenv global 3.10.4

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

echo "${GREEN}Running Bootstrap${NC}"
nvm use && npm install && npm run bootstrap

echo "${GREEN}Goldfinch Protocol Starting${NC}: open a new terminal and run ${YELLOW}make graph${NC}"
echo ""
npm run start:local
