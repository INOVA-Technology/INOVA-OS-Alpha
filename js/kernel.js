window.Kernel = (function() {
	"use strict"

	// declare private var like this:
	// var secret = "BLABLABLA";
	// so the var secret couldnt be acess by doing: k.secret

	var Kernel = function() {
		this.version = 0.01;
		this.files = {"/": {
			"Users": {

			},

			"usr/": {
				"bin/": {
					"grep":
						"text": {
							// info to exec
						}, 

						"openWith": "terminal"
					}
				}, 

				"dev/": {

				}
			}
		}};
	}

	// define methods like this
	Kernel.prototype.ls = function (argument) {
		console.log('this is the file system');
	}

	Kernel.prototype.info = function (argument) {
		console.log('Version ' + this.version.toString() + ' Alpha');
	}

	return Kernel
}());