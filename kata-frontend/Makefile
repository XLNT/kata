SHELL:?/bin/bash

.PHONY: build

build:
	yarn run build

push:
	aws s3 sync build s3://claim.xlnt.co --delete --acl public-read --profile xlnt-claim --region us-west-2

all: build push
