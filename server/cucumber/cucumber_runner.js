var Cucumber = require('cucumber');
var CucumberConfig = require('./cucumber_config');

var CucumberRunner = function(){
	
};

CucumberRunner.prototype = {
		runTests : function runTests(params,callback){
			var cucumberConfig = new CucumberConfig({
				"featureFilePath":params.featureFilePath,
				"stepDefinitionPath":params.stepDefinitionPath});
			var formatter = Cucumber.Listener.ProgressFormatter({});
			
			var runtime   = Cucumber.Runtime(cucumberConfig);
		    runtime.attachListener(formatter);
		    runtime.start(callback);
		}
		
};

module.exports = CucumberRunner;