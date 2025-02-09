# sudo chown -R $(whoami) ~/.docker
app:
	docker compose rm -sf; \
	docker compose -f docker-compose.yml up --build --detach --pull "always"; \
	docker image prune -f

# chạy tất cả các services development
dev:
	docker compose -f docker-compose-dev.yml down && \
	docker compose -f docker-compose-dev.yml up --build --detach && \
	docker image prune -f

log:
	docker compose -f docker-compose-dev.yml logs -f --tail=10