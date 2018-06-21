
default:
	npm start

push:
	npm run build:ts
	rsync -avz --exclude=node_modules --exclude=dist . opsbox:~/server/backend/source/

pull:
	rsync -avz --exclude=node_modules --exclude=dist opsbox:~/server/backend/source/ .

clean:
	rm -rf dist node_modules

.PHONY: default push pull
