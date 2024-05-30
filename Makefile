# sudo chown -R $(whoami) ~/.docker
app:
	docker compose rm -sf; docker compose -f docker-compose.yml up --build --detach --pull "always"; docker image prune -f

dev:
	docker compose rm -sf; docker compose -f docker-compose-dev.yml up --build --detach; docker image prune -f

log:
	docker compose logs -f --tail=10

node:
	docker exec -it node-fmecg sh

db:
	docker exec -it database-fmecg sh

bin:
	docker exec -it bin-fmecg sh

# migrate: sau khi vào bash => gõ /app/bin/migrate
# migrate: sau khi vào bash => gõ /app/bin/server_chat remote
chat:
	docker exec -it chat-fmecg sh

dbchat:
	docker exec -it database-chat-fmecg sh



