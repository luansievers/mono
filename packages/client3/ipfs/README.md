# INTER PLANETARY FILE SYSTEM (IPFS)

- Decentralized storage and content distribution system
- Documentation (horrible): https://ipfs.io/docs

# SETUP

1. Run `make ipfs` to run spin up IPFS container and daemon. Access IPFS WebUI at http://localhost:5001/webui
2. First test:
   1. Upload a file with the File Uploader
   2. Look in the console and you will see a: `Qm...` hash
   3. go to http://localhost:5001/webui and enter the hash into the search bar
      1. You may be asked for the API address and port. Enter `http://localhost:5001` and click `Submit`
   4. Magic.
3. Useful site to see file hosting: https://natoboram.gitlab.io/public-gateway-cacher/
