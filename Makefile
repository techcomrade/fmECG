# run app using docker
# sudo chown -R $(whoami) ~/.docker
# docker container rm -f node_fmecg; docker compose -f docker-compose.yml run --rm --name node_fmecg -p 3000:3000 node_app
app:
	docker compose rm -sf; docker compose -f docker-compose.yml up --build --detach --pull "always"; docker image prune -f

dev:
	docker compose rm -sf; docker compose -f docker-compose-dev.yml up --build --detach; docker image prune -f

log:
	docker compose logs -f --tail=10

# giải thích docker command line
# docker container rm -f fmecg_app: xoá container tên fmecg_app (nếu có)

# docker compose -f docker-compose.yml run --rm --name fmecg_app -p 3000:3000 node_app
# 1. docker compose -f docker-compose.yml: compose file docker-compose.yml
# 2. run --rm --name fmecg_app --use-aliases node_app: chạy container này --rm(xoá sau khi exit), --name(đặt tên là fmecg_app), node_app(tên services trên docker-compose.yml)

# đảm bảo phải make app trước để vào terminal của container nhằm update package npm i, ...
node:
	docker exec -it node-fmecg sh

db:
	docker exec -it database-fmecg sh

bin:
	docker exec -it bin-fmecg sh



