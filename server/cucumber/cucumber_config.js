/**
 * New node file
 */
var Cucumber = require('cucumber');

var CucumberConfig = function(params) {
	this.params = params;
	this.featureFilePath = [this._getValueOrDefault("featureFilePath",
			"features")];
	this.stepDefinitionPath = [this._getValueOrDefault("stepDefinitionPath","step-definitions")];
	this.tagOptionValues = this._getValueOrDefault("tagOptionValues",[]);
	console.log(this);
};

CucumberConfig.prototype = {
	getFeatureSources : function getFeatureSources() {
		var expandedFeaturePaths = Cucumber.Cli.ArgumentParser.FeaturePathExpander
				.expandPaths(this.featureFilePath);
		var featureSourceLoader = Cucumber.Cli
				.FeatureSourceLoader(expandedFeaturePaths);
		var featureSources = featureSourceLoader.getSources();
		return featureSources;

	},

	getAstFilter : function getAstFilter() {
		var tagGroups = Cucumber.TagGroupParser
				.getTagGroupsFromStrings(this.tagOptionValues);
		var rules = [];
		tagGroups.forEach(function(tags) {
			var rule = Cucumber.Ast.Filter.AnyOfTagsRule(tags);
			rules.push(rule);
		});

		rules.push(Cucumber.Ast.Filter.ScenarioAtLineRule());
		var astFilter = Cucumber.Ast.Filter(rules);
		return astFilter;
	},

	getSupportCodeLibrary : function getSupportCodeLibrary() {
		var expandedSupportCodePaths = Cucumber.Cli.ArgumentParser.SupportCodePathExpander.expandPaths(this.stepDefinitionPath);
		var supportCodeLoader = Cucumber.Cli.SupportCodeLoader(expandedSupportCodePaths);
		var supportCodeLibrary = supportCodeLoader.getSupportCodeLibrary();
		return supportCodeLibrary;
	},

	_getValueOrDefault : function(valueToFind, defaultValue) {
		var value = this.params[valueToFind];
		return ((typeof (value) != 'undefined') ? value : defaultValue);
	}
};

module.exports = CucumberConfig;