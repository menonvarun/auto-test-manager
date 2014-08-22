/**
 * New node file
 */
var CodeManager = function(params){
	this.params = params;	
};

CodeManager.prototype = {
	downloadCode : function downloadCode(pathToDownload){
		
		switch(this.params.codeSourceType){
		case "git":
			var repo = this.params.codeSource;
			var git = new CodeManager.GitIntegration();
			git.clone(repo, pathToDownload);
			break;
		case "folder":
			//var origFolderPath = this.params.codeSource;
			/* Need to implement.
			 * copyFolder(origFolderPath,pathToDownload);			 * 
			 */
			break;
		default:
			throw "The said codeSourceType: "+this.params.codeSourceType+" not supported";
		}
		
	}	

	
};

CodeManager.GitIntegration = require('./git_integration');

module.exports = CodeManager;