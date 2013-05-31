window.Kernel = (function() {
	"use strict"

	// declare private var like this:
	// var secret = "BLABLABLA";
	// so the var secret couldnt be acess by doing: k.secret

	var Kernel = function() {
		this.version = 0.01;
		this.files = {"/": {
			"Users": {
				"Guest": {
					"bla.txt": {
						"content":
							"This is a test text file"
					}
				}
			},
			"usr/": {
				"bin/": {
					"grep.sh": {
						"content":
							"" // file text to exec
					}, 
					"cat.sh": {
						"content":
							""
					}
				}, 
				"dev/": {

				}	
			}
		}};
		this.dir = this.files["/"];
	}

	Kernel.prototype.runCommand = function(cmd) {
		var args = cmd.split(" ").slice(1);
		var cmd = cmd.split(" ")[0];
		this[cmd].apply(this, args);
	};

	Kernel.prototype.ls = function () {
		console.log(this.dir);
	}

	Kernel.prototype.info = function () {
		console.log('Version ' + this.version.toString() + ' Alpha');
	}

	Kernel.prototype.cd = function (path) {
		this.dir = this.dir[path];
	}

	Kernel.prototype.pwd = function() {
		// this will show the path, like: /Users/Guest/
		// or like /usr/local/bin/
	};

	return Kernel
}());