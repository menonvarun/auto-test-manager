var TestManager = require('../../test_manager');
var utils = TestManager.Utils.util;
 
var CodeManager = function(params){
	this.params = params;	
};

CodeManager.prototype = {
	downloadCode : function downloadCode(pathToDownload){
		
		switch(this.params.type){
		case "git":
			var repo = this.params.codeSource;
			var git = new CodeManager.GitIntegration();
			git.clone(repo, pathToDownload);
			break;
		case "folder":
			var origFolderPath = this.params.codeSource;
			utils.copyRecursiveSync(origFolderPath,pathToDownload);
			break;
		default:
			throw "The said codeSourceType: "+this.params.codeSourceType+" not supported";
		}
		
	}	

	
};

CodeManager.GitIntegration = require('./git_integration');

module.exports = CodeManager;