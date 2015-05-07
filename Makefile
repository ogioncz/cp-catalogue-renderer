all: Main.js

Main.js:
	tsc --module amd Main.ts

clean:
	rm *.js
