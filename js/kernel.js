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
				"fun": {
					"man": "outputs a word 10 times<br/>Usage: fun <word>"
				},
				"help": {
					"man": "shows a list of commands<br/>Usage: help"
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
		this.stdout("$ " + cmd.toString() + "<br/><br/>");
		try {
			var args = cmd.split(" ").slice(1);
			var cmd = cmd.split(" ")[0];
			this[cmd].apply(this, args);
		} catch(e) {
			this.stdout("Unknown command " + '"' +cmd.split(" ")[0] + '"<br/>');
		}
		this.stdout("<br/>");
	};

	Kernel.prototype.ls = function () {
		for(var key in this.dir) {
		    this.stdout(key + "<br/>");
		}
		// this.stdout("<br/>")
	}

	Kernel.prototype.info = function () {
		this.stdout('Version ' + this.version.toString() + ' Alpha');
	}

	Kernel.prototype.cd = function (path) {
		if (this.dir[path]) {
			this.dir = this.dir[path];
		}
		else {
			this.stdout('cd: ' + path + ': No such file or directory');
		}
	}

	Kernel.prototype.help = function() {
		this.stdout("COMMANDS: <br />");
		this.stdout("ls<br />");
		this.stdout("cd<br />");
		this.stdout("info<br />");
		this.stdout("help<br />");
		this.stdout("fun<br />");
		this.stdout("clear<br />");
	}

	Kernel.prototype.fun = function (text) {
		var i = 1;
		while (i < 11) {
			this.stdout(text + " ");
			i++
		}
		this.stdout('<br/>');
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
		this.stdout(out + "<br/>");
	};

	Kernel.prototype.pwd = function() {
		// this will show the path, like: /Users/Guest/
		// or like /usr/local/bin/
	};

	return Kernel
}());