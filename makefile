release:
	make lint && make test
lint:
	deno lint lib/main.ts
test:
	deno test test.ts