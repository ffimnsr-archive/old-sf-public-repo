
default:
	npm start

push:
	rsync -avz --exclude=node_modules --exclude=dist . opsbox:~/server/backend/source/

pull:
	rsync -avz --exclude=node_modules --exclude=dist opsbox:~/server/backend/source/ .

build:
	docker-compose build
	docker-compose up -d

clean:
	rm -rf dist node_modules

.PHONY: default push pull build clean
