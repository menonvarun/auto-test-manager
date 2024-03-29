var CucumberFileLogFormatter = function(options) {
  var Cucumber         = require('cucumber');

  var self             = Cucumber.Listener.Formatter(options);
  var summaryFormatter = Cucumber.Listener.SummaryFormatter({
    coffeeScriptSnippets: options.coffeeScriptSnippets,
    logToConsole: false
  });
  var currentMaxStepLength = 0;

  var parentHear = self.hear;
  self.hear = function hear(event, callback) {
    summaryFormatter.hear(event, function () {
      parentHear(event, callback);
    });
  };

  self.handleBeforeFeatureEvent = function handleBeforeFeatureEvent(event, callback) {
    var feature = event.getPayloadItem('feature');
    var tags = feature.getTags();
    var tagNames = [];
    for (var idx = 0; idx < tags.length; idx++) {
      tagNames.push(tags[idx].getName());
    }
    var source = 'tag :' + tagNames.join(" ") + "\n" + feature.getKeyword() + ": " + feature.getName() + "\n";
    self.log(source);    
    callback();
  };

  self.handleBeforeScenarioEvent = function handleBeforeScenarioEvent(event, callback) {
    var scenario = event.getPayloadItem('scenario');
    var tags = scenario.getOwnTags();
    var tagNames = [];
    for (var idx = 0; idx < tags.length; idx++) {
      tagNames.push(tags[idx].getName());
    }
    var tagSource ='tag :' + tagNames.join(" ") ;
    var source = scenario.getKeyword() + ": " + scenario.getName();
    var lineLengths = [source.length, self.determineMaxStepLengthForElement(scenario)];
    if (scenario.getBackground() !== undefined) {
      lineLengths.push(self.determineMaxStepLengthForElement(scenario.getBackground()));
    }
    lineLengths.sort(function(a,b) { return b-a; });
    currentMaxStepLength = lineLengths[0];

    source = tagSource + "\n" + self._pad(source, currentMaxStepLength + 3);

    self.logIndented(source, 1);
    callback();
  };

  self.handleAfterScenarioEvent = function handleAfterScenarioEvent(event, callback) {
    self.log("\n");
    callback();
  };

  
  
  self.getStepResultStatus = function (stepResult) {
	  var status ="";
	    if (stepResult.isFailed()) status = 'failed';
	    else if (stepResult.isPending()) status = 'pending';
	    else if (stepResult.isSkipped()) status = 'skipped';
	    else if (stepResult.isSuccessful()) status = 'passed';
	    else if (stepResult.isUndefined()) status = 'undefined';
	    return status;
	  };

 
  self.handleStepResultEvent = function handleStepResultEvent(event, callback) {
    var stepResult = event.getPayloadItem('stepResult');
    var step = stepResult.getStep();
    if (!step.isHidden() || stepResult.isFailed()) {
      self.logStepResult(step, stepResult);
    }
    callback();
  };

  self.logStepResult = function logStepResult(step, stepResult) {
    var source = step.getKeyword() + (step.getName() || '') + "status: " + self.getStepResultStatus(stepResult);
    source = self._pad(source, self._getCurrentMaxStepLength() + 10)+":" + step.getLine();

    source += "\n";
    self.logIndented(source, 2);

    if (step.hasDataTable()) {
      var dataTable = step.getDataTable();
      self.logDataTable(stepResult, dataTable);
    }

    if (step.hasDocString()) {
      var docString = step.getDocString();
      self.logDocString(stepResult, docString);
    }

    if (stepResult.isFailed()) {
      var failure            = stepResult.getFailureException();
      var failureDescription = failure.stack || failure;
      self.logIndented(failureDescription + "\n", 3);
    }
  };

  self.handleAfterFeaturesEvent = function handleAfterFeaturesEvent(event, callback) {
    var summaryLogs = summaryFormatter.getLogs();
    self.log("\n");
    self.log(summaryLogs);
    callback();
  };

  self.logDataTable = function logDataTable(stepResult, dataTable) {
    var rows         = dataTable.raw();
    var columnWidths = self._determineColumnWidthsFromRows(rows);
    var rowCount     = rows.length;
    var columnCount  = columnWidths.length;
    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      var cells = rows[rowIndex];
      var line = "|";
      for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        var cell        = cells[columnIndex];
        var columnWidth = columnWidths[columnIndex];
        line += " " + self._pad(cell, columnWidth) + "status:"+self.getStepResultStatus(stepResult) + " |";
      }
      line += "\n";
      self.logIndented(line, 3);
    }
  };

  self.logDocString = function logDocString(stepResult, docString) {
    var contents = '"""\n' + docString.getContents() + '\n"""\n';
    contents = self.applyColor(stepResult, contents);
    self.logIndented(contents, 3);
  };

  self.logIndented = function logIndented(text, level) {
    var indented = self.indent(text, level);
    self.log(indented);
  };

  self.indent = function indent(text, level) {
    var indented;
    text.split("\n").forEach(function(line) {
      var prefix = new Array(level + 1).join("  ");
      line = (prefix + line).replace(/\s+$/, '');
      indented = (typeof(indented) == 'undefined' ? line : indented + "\n" + line);
    });
    return indented;
  };

  self.determineMaxStepLengthForElement = function determineMaxStepLengthForElement(element) {
    var max = 0;
    element.getSteps().syncForEach(function(step) {
      var stepLength = step.getKeyword().length + step.getName().length;
      if (stepLength > max) max = stepLength;
    });
    return max;
  }

  self._determineColumnWidthsFromRows = function _determineColumnWidthsFromRows(rows) {
    var columnWidths = [];
    var currentColumn;

    rows.forEach(function (cells) {
      currentColumn = 0;
      cells.forEach(function (cell) {
        var currentColumnWidth = columnWidths[currentColumn];
        var currentCellWidth   = cell.length;
        if (typeof currentColumnWidth == "undefined" || currentColumnWidth < currentCellWidth)
          columnWidths[currentColumn] = currentCellWidth;
        currentColumn += 1;
      });
    });

    return columnWidths;
  };

  self._getCurrentMaxStepLength = function _getCurrentMaxStepLength() {
    return currentMaxStepLength;
  };

  self._pad = function _pad(text, width) {
    var padded = "" + text;
    while (padded.length < width) {
      padded += " ";
    }
    return padded;
  };

  return self;
};
module.exports = CucumberFileLogFormatter;
