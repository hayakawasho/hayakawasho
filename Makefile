RUN_CONTEXT ?= docker-compose exec node

up:
	chmod +x ./get-local-ip-addr.sh
	./get-local-ip-addr.sh
	docker-compose up -d
	$(RUN_CONTEXT) bash

build:
	docker-compose build

down:
	docker-compose down --remove-orphans
