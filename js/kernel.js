window.Kernel = (function() {
	"use strict";

	var Kernel = function(output) {
		this.output = output;
		this.version = 0.01;
		this.username = ["root", "Johny", "Guest"];
		this.password = {
			"root": {
				"password": "bacon"
			},
			"Johny": {
				"password": "ham"
			},
			"Guest": {
				"password": "andEggs"
			}
		};
		
		this.currentUsr = localStorage.username || this.username[0];
		this.$PS1 = "[\\u]$";
		this.files = localStorage.system ? JSON.parse(localStorage.system) : {"/": {
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
					"man": "Changes your directory<br/>Usage: cd [directory]"
				},
				"fun": {
					"man": "outputs a word an amount of times<br/>Usage: fun [word] [times]"
				},
				"help": {
					"man": "shows a list of commands<br/>Usage: help"
				},
				"clear": {
					"man": "Clears the terminal<br/>Usage: clear"
				},
				"cat": {
					"man": "prints content of a file<br/>Usage: cat [filename]"
				},
				"whoami": {
					"man": "tells what the current user is<br/>Usage: whoami"
				},
				"login": {
					"man": "logs in as a different user<br/>Usage: login [user]"
				},
				"newUsr": {
					"man": "creates a new user<br/>Usage: newUsr [username]"
				},
				"usrList": {
					"man": "shows list of users<br/>Usage: usrList"
				},
				"rm": {
					"man": "removes a file<br/>Usage: rm [file]"
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
	};

	Array.prototype.contains = function(obj) {
		var i, l = this.length;
		for (i = 0; i < l; i++) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;
	};

	Kernel.prototype.setPrompt = function(p) {
		this.$PS1 = p.replace(/\\/, "\\\\");
	}

	Kernel.prototype.getPrompt = function(p) {
		return k.$PS1.replace(/\\u/, k.currentUsr);
	}

	Kernel.prototype.stdout = function(text) {
		this.output.innerHTML += text.toString();
	};

	Kernel.prototype.clear = function(text) {
		this.output.innerHTML = "";
	};

	Kernel.prototype.rm = function(file) {
		if (file != "Users/" && file != "bin/" && file != "usr/") {
			delete this.dir[file];
			this.stdout(file + " has been deleted");
		}
		else {
			this.stdout("you do not have permissions to delete this folder");
		}
	}

	Kernel.prototype.cat = function(file) {
		if (file !== undefined) {
			this.stdout(this.dir[file].content + "<br/>");
		} else {
    		this.stdout("please include a file name");
    	}
    };

	Kernel.prototype.login = function(guy, pass) {
		if (this.username.contains(guy)) {
			if (pass == this.password[guy]["password"]) {
				this.currentUsr = guy;
				this.stdout("logged in as " + this.currentUsr);
			}
			else {
				this.stdout("wrong password");
			}
        }
        else {
        	this.stdout("Not a real user");
	    }
	    this.stdout("<br/>")
	};


	Kernel.prototype.write = function(file, text) {
		this.dir[file] = {};
		this.dir[file].content = '"' + Array.prototype.slice.call(arguments).join(" ") + '"';
	};

	Kernel.prototype.newUsr = function(name, pass) {
		this.username.push(name);
		this.files["/"]["Users/"][name + "/"] = {};
		this.password[name] = {
			"password": pass
		};
		this.stdout("New user: " + name);
	};

	Kernel.prototype.usrList = function() {
		this.stdout("Users: <br />" + this.username + "<br />");
	}

	Kernel.prototype.whoami = function(display) {
		display = typeof display !== 'undefined' ? display : true;
		if (display) {
			this.stdout(this.currentUsr + "<br/>");
		} else {
			return this.currentUsr;
		}
	};

	Kernel.prototype.runCommand = function(cmd) {
		this.stdout(this.getPrompt() + " " + cmd.toString() + "<br/><br/>");
		var args = cmd.split(" ").slice(1);
		var cmd = cmd.split(" ")[0];
		if (this.__proto__[cmd]) {
			this[cmd].apply(this, args);
		} else {
			this.stdout("Unknown command " + '"' +cmd.split(" ")[0] + '"<br/>');
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
	};

	Kernel.prototype.info = function () {
		this.stdout('Version ' + this.version.toString() + ' Alpha<br/>');
	};

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
	};

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
		this.stdout("rm<br />");
	};

	Kernel.prototype.fun = function (text, times) {
		var i = 1;
		times = parseInt(times, 10);
		while (i <= times) {
			this.stdout(text + " <br />");
			i++
		}
		this.stdout('<br/>');
	};

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

	return Kernel;
}());
