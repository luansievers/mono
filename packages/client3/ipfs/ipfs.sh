# get docker container id
docker_id=$(docker ps | grep ipfs-storage | awk '{print $1}')
echo "docker_id: $docker_id"

sleep 5;

docker exec -it $docker_id ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
docker exec -it $docker_id ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET", "OPTIONS"]'

# TODO: FUTURE SACHA PROBLEM:
# docker exec -it $docker_id ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
# docker exec -it $docker_id ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
# docker exec -it $docker_id ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'