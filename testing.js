/*var GitIntegration = require('./server/code_manager/git_integration')

var git = new GitIntegration();*/

var TestManager = require("./test_manager");



var build = new TestManager.JobManager();

/*var testData = {
	"client" : {
		"tool" : "folder",
		"featureFolderPath" : "C:/Users/varunm/.test_manager/builds/12/features"
	},
	"sourceCode" : {
		"type" : "folder",
		"codeSource" : "C:/Users/varunm/.test_manager/builds/12/step-definitions"
	}
};
build.startANewJob(testData);*/
var cuRunner = new TestManager.CucumberRunner();
var data = {
	"featureFilePath" : "c:/Users/varunm/.test_manager/builds/12/features",	
	"stepDefinitionPath" : "c:/Users/varunm/.test_manager/builds/12/step-definitions"
};
cuRunner.runTests(data,function(){});

/*var utils = TestManager.Utils.util;

utils.copyRecursiveSync("C:/Users/varunm/.test_manager/builds/12/features","C:/test");*/