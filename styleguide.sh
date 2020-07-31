docker rm $(docker ps -a -q) -f
docker volume prune -f
docker-compose -f docker-compose-dev-styleguide-dev.yml up --build