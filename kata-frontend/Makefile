SHELL:?/bin/bash

.PHONY: build

build:
	yarn run build

push:
	aws s3 sync build s3://claim.xlnt.co --acl public-read \
		--region us-west-2 \
		--profile xlnt-claim
	aws s3 sync build s3://makerdao.xlnt.co --acl public-read \
		--region us-west-2 \
		--profile xlnt-claim

bust:
	aws cloudfront create-invalidation --distribution-id EXN1MUQWICODX \
  		--paths '/*' \
		--profile xlnt-claim
	aws cloudfront create-invalidation --distribution-id E30DEKVN6TILU7 \
  		--paths '/*' \
		--profile xlnt-claim

all: build push bust
