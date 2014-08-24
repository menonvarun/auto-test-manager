var TestManager = require('../../test_manager');
var utils = TestManager.Utils.util;

var FolderManagerClient = function(params){
	this.folderPath = params.featureFolderPath;
};

FolderManagerClient.prototype = {
		downloadFeatureFiles : function downloadFeatureFiles(pathToDownload){
			utils.copyRecursiveSync(this.folderPath,pathToDownload);
		}
		
};

module.exports = FolderManagerClient;