GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'


# Handle node version
node_version=`node -v`
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

if [ "$node_version" != "v16.15.1" ]; then
  echo $node_version
  nvm install 16.15.1
fi

nvm use
npm --prefix packages/subgraph run start-local
echo ""
echo "${YELLOW}Sleeping for 45 seconds${NC}"
sleep 45 
npm --prefix packages/subgraph run create-local
npm --prefix packages/subgraph run deploy-local

echo "${GREEN}Graph Uploaded${NC}"
echo ""

echo "${GREEN}Starting IPFS node for client3${NC}"
docker compose -f packages/client3/ipfs/docker-compose.yaml up -d 
echo ""

echo "${GREEN}Starting Client 3${NC}"
npm --prefix packages/client3 run dev
