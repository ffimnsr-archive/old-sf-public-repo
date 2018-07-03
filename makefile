default:
	npm start

push:
	npm run build:bundle
	rsync -avz dist opsbox:~/server/smartfunding/
	rsync -avz makefile opsbox:~/server/smartfunding/

build:
	docker-compose build
	docker-compose up -d

clean:
	rm -rf dist node_modules

.PHONY: default push build clean
