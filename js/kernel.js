window.Kernel = (function() {
	"use strict"

	var Kernel = function() {
		
	}

	Kernel.prototype.ls = function (argument) {
		console.log('this is the file system');
	}

	return Kernel
}());