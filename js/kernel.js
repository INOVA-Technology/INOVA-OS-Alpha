window.Kernel = (function() {
	"use strict"

	var Kernel = function(output) {
		this.output = output
		this.version = 0.01;
		this.files = {"/": {
			"Users/": {
				"Guest/": {
					"bla.txt": {
						"content": 
							"This is a test text file"
					}
				},
                "Admin/": {

                }
			},
			"bin/": {
				"ls": {
						"man": "Lists the contents of a directory a files<br/>Usage: ls"
				},
				"cd": {
					"man": "Changes your directory<br/>Usage: cd <directory>"
				},
				"clear": {
					"man": "Clears the terminal<br/>Usage: clear"
				}
			},
			"usr/": {
				"bin/": {
					
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

	Kernel.prototype.clear = function(text) {
		this.output.innerHTML = "";
	}

	Kernel.prototype.runCommand = function(cmd) {
		try {
			var args = cmd.split(" ").slice(1);
			var cmd = cmd.split(" ")[0];
			this[cmd].apply(this, args);
		} catch(e) {
			this.stdout("$ " + cmd.toString() + "<br /><br />");
			this.stdout("Unknown command " + "\"" +cmd.split(" ")[0] + "\"");
		}
		this.stdout("<br/><br/>");
	};

	Kernel.prototype.ls = function () {
		this.stdout("$ ls <br /><br />");
		for(var key in this.dir) {
		    this.stdout(key + "<br/>");
		}
		this.stdout("<br/>")
	}

	Kernel.prototype.info = function () {
		this.stdout("$ info <br /><br />");

		this.stdout('Version ' + this.version.toString() + ' Alpha');
	}

	Kernel.prototype.cd = function (path) {
		this.stdout("$ cd " + path.toString());
		this.dir = this.dir[path];
	}

	Kernel.prototype.fun = function (text) {
		var i = 1;
		this.stdout("$ fun " + text.toString() + "<br />");
		while (i < 11) {
		this.stdout(text);
		i++
	}
	}

	Kernel.prototype.man = function(cmd) {
		var out;
		this.stdout("$ man " + cmd + "<br /> <br />");

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