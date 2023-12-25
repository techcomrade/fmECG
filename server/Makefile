# run app using docker
# docker container rm -f node_fmecg; docker compose -f docker-compose.yml run --rm --name node_fmecg --use-aliases -p 3000:3000 node_app
app:
	docker compose -f docker-compose.yml run --rm --name node_fmecg -p 3000:3000 node_app

# giải thích docker command line
# docker container rm -f fmecg_app: xoá container tên fmecg_app

# docker compose -f docker-compose.yml run --rm --name fmecg_app --use-aliases node_app
# 1. docker compose -f docker-compose.yml: compose file docker-compose.yml
# 2. run --rm --name fmecg_app --use-aliases node_app: chạy container này --rm(xoá sau khi exit), --name(đặt tên là fmecg_app), node_app(tên services trên docker-compose.yml)