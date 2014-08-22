/*var GitIntegration = require('./server/code_manager/git_integration')

var git = new GitIntegration();*/

var TestManager = require("./test_manager");
/*


var build = new TestManager.JobManager();

var job = build.createNewJob({"codeSourceType":"git","codeSource":"https://github.com/menonvarun/testInProgress-testng-client"});
job.startJob();
console.log(job);*/
console.log(process.cwd());

var cuRunner = new TestManager.CucumberRunner();
var data = {
	"featureFilePath" : "c:/Users/varunm/.test_manager/builds/12/features",	
	"stepDefinitionPath" : "c:/Users/varunm/.test_manager/builds/12/step-definitions"
};
cuRunner.runTests(data);