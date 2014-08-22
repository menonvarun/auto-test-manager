var TestManager = require("./../../test_manager",false);
var fs = require('fs');

var JobManager = function(){

	this.fold = new TestManager.FolderManager();
	//var fold = new folder.FolderManager();	
	this.buildNoFilePath = this.fold.getTestManagerPath()+"/"+JobManager.BUILD_NO_FILE;
	
};

JobManager.prototype = {
		init : function init(){	
			
			if(!(this.fold.folderExists(this.buildNoFilePath))){
				this._writeBuildNumber(0);
			}
		},
		getNextJobNumber : function getNextJobNumber(){
			var number = this._getLastJobNumber() + 1;
			this._writeBuildNumber(number);
			return number;				
		},
		
		_getLastJobNumber : function _getLastJobNumber(){
			var data = fs.readFileSync(this.fold.getTestManagerPath() + "/"+JobManager.BUILD_NO_FILE,{encoding :'utf8'});
			return parseInt(data);
		},
		
		_writeBuildNumber : function _writeBuildNumber(buildNumber){
			fs.writeFileSync(this.buildNoFilePath, buildNumber);				
		},	
		
		getRunningJobs : function getRunningBuilds(){
			throw "not supported";
		},
		
		createNewJob : function createNewJob(params){
			var number = this.getNextJobNumber();
			var newJobPath = this.fold.getJobFolderPath(number);
			
			var newJob = new JobManager.Job({ "folderPath":newJobPath,"jobNumber":number, "params":params });
			
			return newJob;
		} 
};
JobManager.BUILD_NO_FILE = "lastBuildNo";

JobManager.JobLogger = require('./job_logger');
JobManager.Job = require('./job');

//JobManager.BUILD_NO_FILE_PATH = TestManager.FolderManager.getTestManagerPath() + "/" + JobManager.BUILD_NO_FILE; 
module.exports = JobManager;