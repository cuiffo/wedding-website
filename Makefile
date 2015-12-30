src = src/

modules = ${src}math.js\
					${src}dom.js\
					${src}main.js

js:
	java -jar compiler.jar --js ${modules} --js_output_file public/main.min.js
	cat ${modules} > public/main.js
clean:
	rm main.min.js main.js
