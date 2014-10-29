var Cucumber = require('cucumber');
var CucumberConfig = require('./cucumber_config');
var CucumberFileLogFormatter = require('./file_log_formatter');
var SimpleFileLogFormatter = require('./simple_log_formatter');
var fs = require('fs');
var CucumberRunner = function(){
	
};

CucumberRunner.prototype = {
		runTests : function runTests(params,callback){
			var logFilePath = params.logFilePath;
			//fs.writeFileSync(logFilePath,"");
			var cucumberConfig = new CucumberConfig({
				"featureFilePath":params.featureFilePath,
				"stepDefinitionPath":params.stepDefinitionPath});
			
			var formatter = Cucumber.Listener.ProgressFormatter({});
			var formatter1 = CucumberFileLogFormatter({
				"logToFunction": function(dataToLog){
				//	fs.appendFileSync(logFilePath,dataToLog);	
			}
			});
			var fileFormatter = Cucumber.Listener.ProgressFormatter({
				"logToFunction": function(dataToLog){
					fs.appendFileSync(logFilePath,dataToLog);					
				}
			});
			
			var processFormatter = SimpleFileLogFormatter({});
			
			
			var runtime   = Cucumber.Runtime(cucumberConfig);
			//runtime.attachListener(formatter);
			//runtime.attachListener(formatter1);
		    runtime.attachListener(processFormatter);
		    runtime.start(callback);
		}
		
};

module.exports = CucumberRunner;