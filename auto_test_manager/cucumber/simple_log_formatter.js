var SimpleFileLogFormatter = function(options) {
	var Cucumber = require('cucumber');

	var self = Cucumber.Listener.Formatter(options);
	var summaryFormatter = Cucumber.Listener.SummaryFormatter({
		coffeeScriptSnippets : options.coffeeScriptSnippets,
		logToConsole : false
	});
	var currentMaxStepLength = 0;

	var parentHear = self.hear;
	self.hear = function hear(event, callback) {
		summaryFormatter.hear(event, function() {
			parentHear(event, callback);
		});
	};

	self.handleBeforeFeatureEvent = function handleBeforeFeatureEvent(event,
			callback) {
		var feature = event.getPayloadItem('feature');
		self.sendProcessMessage("beforeFeature",self._getJsonData(feature));
		callback();
	};

	self.handleAfterFeatureEvent = function handleBeforeFeatureEvent(event,
			callback) {
		var feature = event.getPayloadItem('feature');
		self.sendProcessMessage("afterFeature",self._getJsonData(feature));
		callback();
	};

	self.handleBeforeStepEvent = function handleBeforeFeatureEvent(event,
			callback) {
		var step = event.getPayloadItem('step');
		self.sendProcessMessage("beforeStep",self._getJsonData(step));
		callback();
	};

	self.handleAfterStepEvent = function handleBeforeFeatureEvent(event,
			callback) {
		var step = event.getPayloadItem('step');
		self.sendProcessMessage("afterStep",self._getJsonData(step));
		callback();
	};

	self.handleBeforeScenarioEvent = function handleBeforeScenarioEvent(event,
			callback) {
		var scenario = event.getPayloadItem('scenario');
		self.sendProcessMessage("beforeScenario",self._getJsonData(scenario));
		callback();
	};

	self.handleAfterScenarioEvent = function handleAfterScenarioEvent(event,
			callback) {
		var scenario = event.getPayloadItem('scenario');
		self.sendProcessMessage("afterScenario",self._getJsonData(scenario));
		callback();
	};

	self.handleStepResultEvent = function handleStepResultEvent(event, callback) {
		var stepResult = event.getPayloadItem('stepResult');
		self.sendProcessMessage("stepResult",self._getStepResultData(stepResult));
		callback();
	};

	self.handleAfterFeaturesEvent = function handleAfterFeaturesEvent(event,
			callback) {

	};
	
	self.sendProcessMessage = function sendProcessMessage(event,data){
		console.log(data);
		process.send({
			"event" : event,
			"data" : data		
		});	
	};
	
	self._getFeatureData = function _getFeatureData(feature){
		var featureData = {};
		featureData.name = feature.getName();
		featureData.line = feature.getLine();
		featureData.tags = []
		
		featureData.description = ""; 
		try {
			featureData.description = feature.getDescription();
		} catch(e){}

		try {
			featureData.tags = self._processAndGetTagNames(feature.getTags());
		} catch(e){}
		
		return featureData;		
	};
	
	self._getJsonData = function _getJsonData(data){
		var jsonData = {};
		jsonData.name = data.getName();
		jsonData.line = data.getLine();
		jsonData.tags = [];
		jsonData.description = ""; 
		try {
			jsonData.description = data.getDescription();
		} catch(e){}

		try {
			jsonData.tags = self._processAndGetTagNames(data.getTags());
		} catch(e){}

		
		return jsonData;		
	};
	
	self._getScenarioData = function _getScenarioData(scenario){
		var scenarioData = {};
		scenarioData.name = scenario.getName();
		scenarioData.description = scenario.getDescription();
		scenarioData.line = scenario.getLine();
		scenarioData.tags = self._processAndGetTagNames(scenario.getTags());
		return scenarioData;		
	};
	
	self._getStepResultData = function _getStepResultData(stepResult){
		var jsonData = self._getJsonData(stepResult.getStep());
		
		var status ="";
	    if (stepResult.isFailed()) status = 'failed';
	    else if (stepResult.isPending()) status = 'pending';
	    else if (stepResult.isSkipped()) status = 'skipped';
	    else if (stepResult.isSuccessful()) status = 'passed';
	    else if (stepResult.isUndefined()) status = 'undefined';
	    
	    jsonData.result = status;
	    return jsonData;		
	};
	
	self._getStepData = function _getStepData(step){
		
	};
	
	self._processAndGetTagNames = function _processAndGetTagNames(tags){
		console.log("received tags: ");
		console.log(tags);
		var tagNames = [];
	    for (var idx = 0; idx < tags.length; idx++) {
	    	console.log("tag name is: " + tags[idx].getName());
	      tagNames.push(tags[idx].getName());
	    }
	    
	    return tagNames;
	}; 
	
	self._getOptionOrDefaultValue = function _getOptionOrDefaultValue(optionName, defaultValue){
		return (typeof(optionValue) != 'undefined' ? optionValue : defaultValue);
	};

	return self;
};
module.exports = SimpleFileLogFormatter;
