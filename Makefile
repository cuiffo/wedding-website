src = src/

modules = ${src}requestAnimationFrame.js\
					${src}classlistPolyfill.js\
					${src}readyPolyfill.js\
					${src}arraypolyfill.js\
					${src}objectpolyfill.js\
					${src}math.js\
					${src}dom.js\
					${src}animator.js\
					${src}buttons.js\
					${src}titleAnimation.js\
					${src}pageAnimation.js\
					${src}pages.js\
					${src}main.js

js:
	java -jar compiler.jar --js ${modules} --js_output_file public/main.min.js
	cat ${modules} > public/testingmain.js
clean:
	rm public/main.min.js public/testingmain.js
