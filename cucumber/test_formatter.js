

 var injectObjcet={};
 var arrinjectObjcet=[];
 
		var Factory=require("../api/factory.js");
		var TestLinkClient	=require("../API/client/testlink/testlinkclient.js");	
		
 injectObjcet.getResult=function(status){
 
  var result={};
			result.failed =status.isFailed();
			result.pending=status.isPending();
			result.skipped=status.isSkipped();
			result.successful=status.isSuccessful();
			result.undefined=status.isUndefined();
			result.getLine=status.getStep().getLine();
			result.setPreviousStep=status.getStep().setPreviousStep();
			result.isOutlineStep=status.getStep().isOutlineStep();
			result.getKeyword=status.getStep().getKeyword();
			result.getName=status.getStep().getName();
			result.getUri=status.getStep().getUri();
			result.getPreviousStep=status.getStep().getPreviousStep();
			result.hasPreviousStep=status.getStep().hasPreviousStep(); 
		    result.duration=status.getDuration();
 console.log(result); 

 arrinjectObjcet.push(result);
 
 };
 
 
 injectObjcet.getSenarioResult=function(result,argument){
 
 var senarioObject={};
 
			 senarioObject.buildScenarios=result.buildScenarios();
			 senarioObject.getKeyword=result.getKeyword();
			 senarioObject.getName=result.getName();
			 senarioObject.getDescription=result.getDescription();
			 senarioObject.getUri=result.getUri();
			 senarioObject.getLine=result.getLine();
			 senarioObject.getBackground=result.getBackground();
			 senarioObject.getSteps=result.getSteps();
			 senarioObject.getTags=result.getTags();
			 senarioObject.getOwnTags=result.getOwnTags();
 
 var statusResult =arrinjectObjcet.every(function(result){
 
 
 result.failed=='true';
 });

	 if(statusResult){
	 argument.status="f"; 
	 }
	 else
	 {
	  argument.status="p";
	 }	 
	 argument.notes=" This is Note Argument";
	 argument.user="admin";
		 
console.log(argument);

		var factory=new Factory(argument);
		var client=factory.getClient();	
		client.reportTCResult(argument,function(testcasename){
		console.log(testcasename);    
		}); 

 
 };
 
 
 var TestFormatter = function (options,argument) {
 

 var Cucumber         = require('../node_modules/cucumber/lib/cucumber');
 
  var failedScenarioLogBuffer = "";
  var undefinedStepLogBuffer  = "";
  var failedStepResults       = Cucumber.Type.Collection();
  var statsJournal            = Cucumber.Listener.StatsJournal();
  var color                   = Cucumber.Util.ConsoleColor;

  var self = Cucumber.Listener.Formatter(options);

  var parentHear = self.hear;
  self.hear = function hear(event, callback) {
    statsJournal.hear(event, function () {
      parentHear(event, callback);
    });
  };

  self.handleStepResultEvent = function handleStepResult(event, callback) {
    var stepResult = event.getPayloadItem('stepResult');
	injectObjcet.getResult(stepResult);
    if (stepResult.isUndefined()) {
      self.handleUndefinedStepResult(stepResult);
    } else if (stepResult.isFailed()) {
      self.handleFailedStepResult(stepResult);
    }
    callback();
  };

  self.handleUndefinedStepResult = function handleUndefinedStepResult(stepResult) {
    var step = stepResult.getStep();
    self.storeUndefinedStep(step);
  };

  self.handleFailedStepResult = function handleFailedStepResult(stepResult) {
    self.storeFailedStepResult(stepResult);
  };

  self.handleAfterScenarioEvent = function handleAfterScenarioEvent(event, callback) {
    if (statsJournal.isCurrentScenarioFailing()) {
      var scenario = event.getPayloadItem('scenario');
	   injectObjcet.getSenarioResult(scenario,argument);
      self.storeFailedScenario(scenario);
    }
    callback();
  };

  self.handleAfterFeaturesEvent = function handleAfterFeaturesEvent(event, callback) {
    self.logSummary();
    callback();
  };

  self.storeFailedStepResult = function storeFailedStepResult(failedStepResult) {
    failedStepResults.add(failedStepResult);
  };

  self.storeFailedScenario = function storeFailedScenario(failedScenario) {
    var name = failedScenario.getName();
    var uri  = failedScenario.getUri();
    var line = failedScenario.getLine();
    self.appendStringToFailedScenarioLogBuffer(uri + ":" + line + " # Scenario: " + name);
  };

  self.storeUndefinedStep = function storeUndefinedStep(step) {
    var snippetBuilder = Cucumber.SupportCode.StepDefinitionSnippetBuilder(step, self.getStepDefinitionSyntax());
    var snippet        = snippetBuilder.buildSnippet();
    self.appendStringToUndefinedStepLogBuffer(snippet);
  };

  self.getStepDefinitionSyntax = function getStepDefinitionSyntax() {
    var syntax = options.coffeeScriptSnippets ? 'CoffeeScript' : 'JavaScript';
    return new Cucumber.SupportCode.StepDefinitionSnippetBuilderSyntax[syntax]();
  };

  self.appendStringToFailedScenarioLogBuffer = function appendStringToFailedScenarioLogBuffer(string) {
    failedScenarioLogBuffer += string + "\n";
  };

  self.appendStringToUndefinedStepLogBuffer = function appendStringToUndefinedStepLogBuffer(string) {
    if (undefinedStepLogBuffer.indexOf(string) == -1)
      undefinedStepLogBuffer += string + "\n";
  };

  self.getFailedScenarioLogBuffer = function getFailedScenarioLogBuffer() {
    return failedScenarioLogBuffer;
  };

  self.getUndefinedStepLogBuffer = function getUndefinedStepLogBuffer() {
    return undefinedStepLogBuffer;
  };

  self.logSummary = function logSummary() {
    if (statsJournal.witnessedAnyFailedStep())
      self.logFailedStepResults();
    self.logScenariosSummary();
    self.logStepsSummary();
    if (statsJournal.witnessedAnyUndefinedStep())
      self.logUndefinedStepSnippets();
  };

  self.logFailedStepResults = function logFailedStepResults() {
    self.log("(::) failed steps (::)\n\n");
    failedStepResults.syncForEach(function(stepResult) {
      self.logFailedStepResult(stepResult);
    });
    self.log("Failing scenarios:\n");
    var failedScenarios = self.getFailedScenarioLogBuffer();
    self.log(failedScenarios);
    self.log("\n");
  };

  self.logFailedStepResult = function logFailedStepResult(stepResult) {
    var failureMessage = stepResult.getFailureException();
    self.log(failureMessage.stack || failureMessage);
    self.log("\n\n");
  };

  self.logScenariosSummary = function logScenariosSummary() {
    var scenarioCount          = statsJournal.getScenarioCount();
    var passedScenarioCount    = statsJournal.getPassedScenarioCount();
    var undefinedScenarioCount = statsJournal.getUndefinedScenarioCount();
    var pendingScenarioCount   = statsJournal.getPendingScenarioCount();
    var failedScenarioCount    = statsJournal.getFailedScenarioCount();
    var details                = [];

    self.log(scenarioCount + " scenario" + (scenarioCount != 1 ? "s" : ""));
    if (scenarioCount > 0 ) {
      if (failedScenarioCount > 0)
        details.push(color.format('failed', failedScenarioCount + " failed"));
      if (undefinedScenarioCount > 0)
        details.push(color.format('undefined', undefinedScenarioCount + " undefined"));
      if (pendingScenarioCount > 0)
        details.push(color.format('pending', pendingScenarioCount + " pending"));
      if (passedScenarioCount > 0)
        details.push(color.format('passed', passedScenarioCount + " passed"));
      self.log(" (" + details.join(', ') + ")");
    }
    self.log("\n");
  };

  self.logStepsSummary = function logStepsSummary() {
    var stepCount          = statsJournal.getStepCount();
    var passedStepCount    = statsJournal.getPassedStepCount();
    var undefinedStepCount = statsJournal.getUndefinedStepCount();
    var skippedStepCount   = statsJournal.getSkippedStepCount();
    var pendingStepCount   = statsJournal.getPendingStepCount();
    var failedStepCount    = statsJournal.getFailedStepCount();
    var details            = [];

    self.log(stepCount + " step" + (stepCount != 1 ? "s" : ""));
    if (stepCount > 0) {
      if (failedStepCount > 0)
        details.push(color.format('failed', failedStepCount    + " failed"));
      if (undefinedStepCount > 0)
        details.push(color.format('undefined', undefinedStepCount + " undefined"));
      if (pendingStepCount > 0)
        details.push(color.format('pending', pendingStepCount   + " pending"));
      if (skippedStepCount > 0)
        details.push(color.format('skipped', skippedStepCount   + " skipped"));
      if (passedStepCount > 0)
        details.push(color.format('passed', passedStepCount    + " passed"));
      self.log(" (" + details.join(', ') + ")");
    }
    self.log("\n");
  };

  self.logUndefinedStepSnippets = function logUndefinedStepSnippets() {
    var undefinedStepLogBuffer = self.getUndefinedStepLogBuffer();
    self.log(color.format('pending', "\nYou can implement step definitions for undefined steps with these snippets:\n\n"));
    self.log(color.format('pending', undefinedStepLogBuffer));
  };

  return self;
};
module.exports = TestFormatter;
