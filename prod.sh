docker rm $(docker ps -a -q) -f
docker volume prune -f
docker-compose -f docker-compose-prod-with-demoioc.yml up --build