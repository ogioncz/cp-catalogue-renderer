all: Main.js

Main.js:
	tsc --module amd --sourcemap Main.ts

watch:
	tsc --watch --module amd --sourcemap Main.ts

clean:
	rm *.js
