var TestManager = require('../../test_manager');

var JobRunner = function(job){
	this.job = job;
	this.codeManager = new TestManager.CodeManager(job.sourceCode);
	this.jobLogger = new TestManager.JobManager.JobLogger(job.reportsFolderPath);
	this.testManagerClient = new TestManager.TestManagerFactory(job.clientConfig).getClient();
};

JobRunner.prototype ={
		run : function run(callback){
			this.status = this.job.STATUS_RUNNING;
			this.codeManager.downloadCode(this.job.stepDefinitionsFolderPath);
			this.testManagerClient.downloadFeatureFiles(this.job.featureFolderPath);
			var cuRunner = new TestManager.CucumberRunner();
			var data = {
					"featureFilePath" : this.job.featureFolderPath,	
					"stepDefinitionPath" : this.job.stepDefinitionsFolderPath
			};
			
			cuRunner.runTests(data,callback);
			
		}
		
};

module.exports = JobRunner;
