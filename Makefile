cf:
	for i in {1..10}; do touch "ex${i}.json"; done

read:
	node read.mjs

ol:
	node oneline.mjs

nk:
	node newkey.mjs

dcb:
	docker build -t newkey-app .
