BASE = .

ISTANBUL = ./node_modules/.bin/istanbul
TEST_COMMAND = NODE_ENV=test ./node_modules/.bin/mocha
COVERAGE_OPTS = --lines 95 --statements 90 --branches 80 --functions 90
BUSTER = ./node_modules/.bin/buster test

main: lint test

cover:
	$(ISTANBUL) cover test/run.js

check-coverage:
	$(ISTANBUL) check-coverage $(COVERAGE_OPTS)

test: cover check-coverage


test-cov: cover check-coverage
	open coverage/lcov-report/index.html

lint:
	./node_modules/jshint/bin/hint ./lib --config $(BASE)/.jshintrc


.PHONY: test
