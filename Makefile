################################################################################
# Setup
################################################################################

setup: setup_git_hooks setup_env_files

# Apply Git hooks
setup_git_hooks:
	cp setup/git/* .git/hooks/
	chmod u+x .git/hooks/*
	chmod +x setup/scripts/run/run_client3.sh
	chmod +x setup/scripts/run/run_protocol.sh


# Copy required environment files
#   NOTE: Gracefully handle errors when copying files only if not existing before
setup_env_files:
	cp -n .env.example .env.local || true
	cp -n packages/client3/.env.example packages/client3/.env.local || true

################################################################################
# Applications
################################################################################

protocol: 
	sh setup/scripts/setup_protocol.sh

reset_protocol: 
	sh setup/scripts/reset_protocol.sh

graph:
	sh setup/scripts/setup_subgraph.sh

# only need to run this once
ipfs:
	$(MAKE) -C packages/client3/ipfs ipfs
	

reset_graph:
	docker compose -f packages/subgraph/docker-compose.yml down -v --rmi all


