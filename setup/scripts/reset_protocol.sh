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

echo "${RED}Resetting Protocol in 5 seconds${NC}"
sleep 5

rm -rf .openzeppelin/unknown-31337.json
rm -rf deployments/localhost/
rm -rf deployments/all_dev.json
rm -rf node_modules
rm -rf packages/client3/node_modules
rm -rf packages/client3/.next
rm -rf packages/protocol/artifacts
rm -rf packages/protocol/cache
rm -rf packages/protocol/node_modules
rm -rf packages/protocol/typechain
