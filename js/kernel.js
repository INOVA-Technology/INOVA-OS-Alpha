window.Kernel = (function() {
	"use strict"

	var Kernel = function(output) {
		this.output = output;
		this.version = 0.01;
		this.username = ["root", "Johny", "Guest"];
  	this.currentUsr = this.username[0];
		this.files = {"/": {
			"Users/": {
				"Johny/": {

				},
				"Guest/": {
					"bla.txt": {
						"content":
							"This is a test text file"
					}

				},
                "Admin/": {
                    "html.html": {
						"content":
							"yo"

					}
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
					"man": "outputs a word an amount of times<br/>Usage: fun <word> <times>"
				},
				"help": {
					"man": "shows a list of commands<br/>Usage: help"
				},
				"clear": {
					"man": "Clears the terminal<br/>Usage: clear"
				},
				"cat": {
					"man": "prints content of a file<br/>Usage: cat <filename>"
				},
				"whoami": {
					"man": "tells what the current user is<br/>Usage: whoami"
				},
				"login": {
					"man": "logs in as a different user<br/>Usage: login <user>"
				},
				"newUsr": {
					"man": "creates a new user<br/>Usage: newUsr <username>"
				},
				"usrList": {
					"man": "shows list of users<br/>Usage: usrList"
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

	Array.prototype.contains = function(obj) {
	  var i, l = this.length;
	  for (i = 0; i < l; i++)
	  {
	    if (this[i] == obj) return true;
	  }
	  return false;
	};

	// function for printing text, instead of console.log()
	Kernel.prototype.stdout = function(text) {
		this.output.innerHTML += text.toString();
	}

	Kernel.prototype.clear = function(text) {
		this.output.innerHTML = "";
	}

	Kernel.prototype.cat = function(file) {
		if (file != undefined) {
				this.stdout(this.dir[file]["content"] + "<br/>");
    	}
    	else {
    		this.stdout("please include a file name");
    	}
    }

	Kernel.prototype.login = function(name) {
		if (this.username.contains(name)) {
			this.currentUsr = name;
			this.stdout("logged in as " + this.currentUsr + "<br />");
        }
        else {
        	this.stdout("Not a real user");
	    }
	}


	Kernel.prototype.write = function(file, text) {
		this.dir[file]["content"] = text;
	}

	Kernel.prototype.newUsr = function(name) {
		this.username.push(name);
		this.files["/"]["Users/"][name + "/"] = {};
		this.stdout("New user: " + name);
	}

	Kernel.prototype.usrList = function() {
		this.stdout("Users: <br />" + this.username + "<br />");
	}

	Kernel.prototype.whoami = function(display) {
		display = typeof display !== 'undefined' ? display : true;
		if (display) {
			this.stdout(this.currentUsr);
		} else {
			return this.currentUsr;
		}
	};

	Kernel.prototype.runCommand = function(cmd) {
		this.stdout(this.currentUsr.toString() + "$ " + cmd.toString() + "<br/><br/>");
		try {
			var args = cmd.split(" ").slice(1);
			var cmd = cmd.split(" ")[0];
			this[cmd].apply(this, args);
		} catch(e) {
			this.stdout("Unknown command " + '"' +cmd.split(" ")[0] + '"<br/>');
			console.error(e.message);
		}
		this.stdout("<br/>");
	};

	Kernel.prototype.ls = function (file) {
		if (file) {
			for(var key in this.dir[file]) {
			    this.stdout(key + "<br/>");
			}
		}
		else {
			for(var key in this.dir) {
			    this.stdout(key + "<br/>");
			}
		}
	}

	Kernel.prototype.info = function () {
		this.stdout('Version ' + this.version.toString() + ' Alpha');
	}

	Kernel.prototype.cd = function (path) {
		var i = path;

		if (i == "~") {
			this.dir = this.files["/"];
		}
		else {
			if (this.dir[path]) {
				this.dir = this.dir[path];
			}
			else {
				this.stdout('cd: ' + path + ': No such file or directory');
			}
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
		this.stdout("cat<br />");
		this.stdout("whoami<br />");
		this.stdout("login<br />");
		this.stdout("newUsr<br />");
		this.stdout("usrList<br />");
	}

	Kernel.prototype.fun = function (text, times) {
		var i = 1;
		times = parseInt(times, 10);
		while (i <= times) {
			this.stdout(text + " <br />");
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

	Kernel.prototype.mkdir = function(file) {
		if (file == undefined) {
			this.stdout("please enter a folder name <br />");
		}
		else {
			this.dir[file + "/"] = {};
		}
	};

	Kernel.prototype.touch = function(file) {
		if (file == undefined) {
			this.stdout("please enter a file name <br />");
		}
		else {
			this.dir[file] = {
				content: ""
			};
		}

	};

	Kernel.prototype.pwd = function() {

		// this will show the path, like: /Users/Guest/
		// or like /usr/local/bin/
	};

	return Kernel
}());
