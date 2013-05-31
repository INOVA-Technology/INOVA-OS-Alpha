window.Kernel = (function() {
	"use strict"

	var Kernel = function(output) {
		this.output = output
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
					"cat": {
						"man": "Reads a files\nUsage: cat <file>"
					}
				}, 
				"dev/": {

				}	
			}
		}};
		this.dir = this.files["/"];
	}

	// function for printing text, instead of console.log()
	Kernel.prototype.stdout = function(text) {
		this.output.innerHTML += text.toString();
	}

	Kernel.prototype.runCommand = function(cmd) {
		var args = cmd.split(" ").slice(1);
		var cmd = cmd.split(" ")[0];
		this[cmd].apply(this, args);
	};

	Kernel.prototype.ls = function () {
		for(var key in this.dir) {
		    this.stdout(key + "<br/>");
		}
		this.stdout("<br/>")
	}

	Kernel.prototype.info = function () {
		this.stdout('Version ' + this.version.toString() + ' Alpha');
	}

	Kernel.prototype.cd = function (path) {
		this.dir = this.dir[path];
	}

	Kernel.prototype.man = function(cmd) {
		var out;
		try {
			out = this.files["/"]["bin/"][cmd]["man"];
		} catch(e) {
			try {
				out = this.files["/"]["usr/"]["bin/"][cmd]["man"];
			} catch(e) {
				out = "Man: Command '" + cmd + "' not found";
			}
		}
		this.stdout(out + "<br/><br/>");
	};

	Kernel.prototype.pwd = function() {
		// this will show the path, like: /Users/Guest/
		// or like /usr/local/bin/
	};

	return Kernel
}());