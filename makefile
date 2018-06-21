default:
	npm start

push:
	npm run build:bundle
	rsync -avz dist opsbox:~/server/smartfunding/

clean:
	rm -rf dist node_modules

.PHONY: default push pull clean
