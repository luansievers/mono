################################################################################
# Setup
################################################################################

setup: setup_git_hooks setup_env_files

# Apply Git hooks
setup_git_hooks:
	cp setup/git/* .git/hooks/
	chmod u+x .git/hooks/*

# Copy required environment files
#   NOTE: Gracefully handle errors when copying files only if not existing before
setup_env_files:
	cp -n .env.example .env.local || true
	cp -n packages/client3/.env.example packages/client3/.env.local || true

################################################################################
# Applications
################################################################################

protocol:
	sh ./setup.sh
