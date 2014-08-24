var TestManager = require("./../../test_manager",false);
var fs = require('fs');
var child = require('child_process');

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
		
		getRunningJobs : function getRunningJobs(){
			throw "not supported";
		},
		
		createNewJob : function createNewJob(params){
			var number = this.getNextJobNumber();
			var newJobPath = this.fold.getJobFolderPath(number);
			var jobData = {
					"jobNumber":number, 
					"folderPath":newJobPath,
					"client" : params.client,
					"sourceCode" : params.sourceCode,
					"params":params
			};
			
			var newJob = new JobManager.Job(jobData);
			
			return newJob;
		},
		
		startANewJob : function startANewJob(params){
			var newJob = this.createNewJob(params);
			var jobProcess = child.fork(
				      __dirname + '/job_process_runner.js',
				      {}, {
				        cwd: process.cwd(),
				        silent: true
				      }
				    );
			jobProcess.send({
			      'command': 'run',
			      'job': newJob
			    });
		}
};
JobManager.BUILD_NO_FILE = "lastBuildNo";

JobManager.JobLogger = require('./job_logger');
JobManager.Job = require('./job');
JobManager.JobRunner = require('./job_runner');

//JobManager.BUILD_NO_FILE_PATH = TestManager.FolderManager.getTestManagerPath() + "/" + JobManager.BUILD_NO_FILE; 
module.exports = JobManager;