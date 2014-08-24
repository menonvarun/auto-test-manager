var fs = require('fs');
var path = require('path');

var Utils = function() {

};

Utils.prototype = {
	copyRecursiveSync : function copyRecursiveSync(src, dest) {
		var copyRecursive = function(src, dest) {
			var exists = fs.existsSync(src);
			var stats = exists && fs.statSync(src);
			var isDirectory = exists && stats.isDirectory();
			if (exists && isDirectory) {
				var destExists = fs.existsSync(dest);
				if (destExists) {
					fs.rmdirSync(dest);
				}
				fs.mkdirSync(dest);
				fs.readdirSync(src).forEach(
						function(childItemName) {
							copyRecursive(path.join(src, childItemName), path
									.join(dest, childItemName));
						});
			} else {
				fs.writeFileSync(dest,fs.readFileSync(src));
				/*var is = fs.createReadStream(src);
				var os = fs.createWriteStream(dest);
				var copyDone = false;
				var errorCopying = false;
				var thrownError;
				is.pipe(os);
				is.on('end', function() {
					copyDone = true;
				});
				is.on('error', function(error) {
					errorCopying = true;
					thrownError = error;
				});
				var intvl = setInterval(function() {
				    if (copyDone) { 
				        clearInterval(intvl);			        
				    } else if(errorCopying){
				    	throw thrownError;
				    }
				}, 100);*/
				// fs.linkSync(src, dest);
			}
		};
		copyRecursive(src, dest);
	}
};

Utils.util = new Utils();
module.exports = Utils;