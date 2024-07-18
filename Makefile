cf:
	for i in {1..10}; do touch "ex${i}.json"; done

read:
	node read.mjs