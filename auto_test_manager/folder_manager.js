
var ArgumentParser = require('./argument_parser');

var argParser = new ArgumentParser(process.argv);
var fs = require('fs');

var FolderManager = function(){
	
	
	
	this.paths = [
	             FolderManager.TEST_MANAGER_PATH,
	             FolderManager.BUILDS_PATH,
	             FolderManager.LOGS_PATH
	             ];
	var self = {
			getJobFolderPath : function getBuildFolderPath(buildNo){
				var buildFolderPath = FolderManager.BUILDS_PATH + "/"+buildNo;
				if(!(self.folderExists(buildFolderPath))){
					fs.mkdirSync(buildFolderPath);
				}				
				return buildFolderPath;
			},	
			
			folderExists : function folderExists(folderPath){
				return fs.existsSync(folderPath);				
			},
			
			_createTestManagerFolder : function _createTestManagerFolder(){
				if(!(self.folderExists(FolderManager.TEST_MANAGER_PATH))){
					for(var i = 0; i < this.paths.length;i++){
						fs.mkdirSync(this.paths[i]);
					}
				}
				
			},
			
			init : function(){
				self._createTestManagerFolder();
			},
			
			getTestManagerPath :  function getTestManagerPath(){
				return FolderManager.TEST_MANAGER_PATH;
			}	
	};
	
	return self;
	
};


FolderManager.TEST_MANAGER_PATH = argParser.getFolderPath() + "/.test_manager";
FolderManager.BUILDS_PATH = FolderManager.TEST_MANAGER_PATH + "/builds";
FolderManager.LOGS_PATH = FolderManager.TEST_MANAGER_PATH + "/logs";

module.exports = FolderManager;
