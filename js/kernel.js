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
		this.$PS1 = "";
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
		self = this;
		this.commands = { // these are the functions meant to be run as commands
						  // in these, use self instead of this in these functions
			setprompt: function(p) {
				self.$PS1 = p;
			},

			cat: function(file) {
				if (file !== undefined) {
					self.stdout(self.dir[file].content + "<br/>");
				} else {
		    		self.stdout("please include a file name");
		    	}
		    },

			clear: function(text) {
				self.output.innerHTML = "";
			},

			rm: function(file) {
				if (file != "Users/" && file != "bin/" && file != "usr/") {
					delete self.dir[file];
					self.stdout(file + " has been deleted");
				}
				else {
					self.stdout("you do not have permissions to delete this folder");
				}
			},

			ls: function (file) {
				if (file) {
					for(var key in self.dir[file]) {
					    self.stdout(key + "<br/>");
					}
				}
				else {
					for(var key in self.dir) {
					    self.stdout(key + "<br/>");
					}
				}
			},

			login: function(guy, pass) {
				if (self.username.contains(guy)) {
					if (pass == self.password[guy]["password"]) {
						self.currentUsr = guy;
						self.stdout("logged in as " + self.currentUsr);
					}
					else {
						self.stdout("wrong password");
					}
		        }
		        else {
		        	self.stdout("Not a real user");
			    }
			    self.stdout("<br/>")
			},

			write: function(file, text) {
				self.dir[file] = {};
				self.dir[file].content = '"' + Array.prototype.slice.call(arguments).join(" ") + '"';
			},

			newUsr: function(name, pass) {
				self.username.push(name);
				self.files["/"]["Users/"][name + "/"] = {};
				self.password[name] = {
					"password": pass
				};
				self.stdout("New user: " + name);
			}, 

			usrList: function() {
				self.stdout("Users: <br />" + self.username + "<br />");
			}, 

			whoami: function(display) {
				self.stdout(self.currentUsr + "<br/>");
			},

			info: function () {
				self.stdout('Version ' + self.version.toString() + ' Alpha<br/>');
			},

			cd: function (path) {
				var i = path;

				if (i == "~") {
					self.dir = self.files["/"];
				}
				else {
					if (self.dir[path]) {
						self.dir = self.dir[path];
					}
					else {
						self.stdout('cd: ' + path + ': No such file or directory');
					}
				}
			},

			help: function() {
				self.stdout("COMMANDS: <br />");
				self.stdout("ls<br />");
				self.stdout("cd<br />");
				self.stdout("info<br />");
				self.stdout("help<br />");
				self.stdout("fun<br />");
				self.stdout("clear<br />");
				self.stdout("cat<br />");
				self.stdout("whoami<br />");
				self.stdout("login<br />");
				self.stdout("newUsr<br />");
				self.stdout("usrList<br />");
				self.stdout("rm<br />");
			},

			touch: function(file) {
				if (file == undefined) {
					self.stdout("please enter a file name <br />");
				}
				else {
					self.dir[file] = {
						content: ""
					};
				}
			},

			fun: function (text, times) {
				var i = 1;
				times = parseInt(times, 10);
				while (i <= times) {
					self.stdout(text + " <br />");
					i++;
				}
				self.stdout('<br/>');
			},

			man: function(cmd) {
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
			},

			mkdir: function(file) {
				if (file == undefined) {
					this.stdout("please enter a folder name <br />");
				}
				else {
					this.dir[file + "/"] = {};
				}
			}
		};

		this.commands.setprompt("[\\u]$");

	};

	// functions not meant to be run as commands go here
	Array.prototype.contains = function(obj) {
		var i, l = this.length;
		for (i = 0; i < l; i++) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;
	};

	Kernel.prototype.whoami = function() {
		return this.currentUsr;
	}

	Kernel.prototype.getprompt = function() {
		return k.$PS1.replace(/\\u/, this.currentUsr);
		// backslashes must be escaped
		// in regex and strings
		// so \\\\ is really \\
		// and \\ is really \
	}

	Kernel.prototype.stdout = function(text) {
		this.output.innerHTML += text.toString();
	};

	Kernel.prototype.runCommand = function(cmd) {
		this.stdout(this.getprompt() + " " + cmd.toString() + "<br/><br/>");
		var args = cmd.split(" ").slice(1);
		var cmd = cmd.split(" ")[0];
		if (this.commands[cmd]) {
			this.commands[cmd].apply(this, args);
		} else {
			this.stdout("Unknown command " + '"' +cmd.split(" ")[0] + '"<br/>');
		}
		this.stdout("<br/>");
	};

	return Kernel;
}());
