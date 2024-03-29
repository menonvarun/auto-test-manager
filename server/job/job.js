var fs = require('fs');
var TestManager = require('../../test_manager');
var util = TestManager.Utils.util;

var Job = function(data){
	this.jobFolderPath = data.folderPath;
	this.jobNumber = data.jobNumber;
	this.status = Job.STATUS_NOT_STARTED;
	this.clientConfig = data.client;
	this.sourceCode = data.sourceCode;
	this.jobParams = (typeof(data.params) != 'undefined') ? data.params : {};	
	this.init();	
	
};

Job.prototype = {
		
		init : function init(){
			this.stepDefinitionsFolderPath = this.jobFolderPath + "/" + Job.STEP_DEF_FOLDER_NAME;;
			this.featureFolderPath = this.jobFolderPath + "/" + Job.FEATURE_FOLDER_NAME;;
			this.reportsFolderPath = this.jobFolderPath + "/" + Job.REPORTS_FOLDER_NAME;;
			this.configFilePath = this.jobFolderPath + "/" + Job.CONFIG_FILE_NAME;
			fs.mkdirSync(this.stepDefinitionsFolderPath);
			fs.mkdirSync(this.featureFolderPath);
			fs.mkdirSync(this.reportsFolderPath);
			fs.writeFileSync(this.configFilePath,this.toString());
			util.copyRecursiveSync(Job.BASE_NODE_MODULE_DIR,this.jobFolderPath + "/" +"node_modules");
			
		},
		
		getJobPath : function getJobPath(){
			return this.jobFolderPath;
		},
		
		getJobNumber : function getJobNumber(){
			return this.jobNumber;			
		},
		
		getStatus : function getStatus(){
			return this.status;
		},
		
		startJob : function startJob(){
			this.status = Job.STATUS_RUNNING;
			this.codeManager.downloadCode(this.stepDefinitionsFolderPath);
			
			
		},
		
		finishJob : function finishJob(){
			this.status = Job.STATUS_FINISHED;
		},
		
		isRunning : function isRunning(){
			if(this.status == Job.STATUS_RUNNING)
				return true;
			return false;				
		},
};

Job.STATUS_NOT_STARTED = "Not Started";
Job.STATUS_RUNNING = "Running";
Job.STATUS_FINISHED = "Finished";
Job.STEP_DEF_FOLDER_NAME = "step-defnitions";
Job.FEATURE_FOLDER_NAME = "features";
Job.REPORTS_FOLDER_NAME = "reports";
Job.CONFIG_FILE_NAME = "job.config";
Job.BASE_NODE_MODULE_DIR = "./resources/node_modules";

module.exports = Job;