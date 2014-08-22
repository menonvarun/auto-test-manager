/**
 * Copyright © 2014 Imaginea Technologies Inc. All Rights Reserved. Licensed
 * under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the
 * License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var TestLinkAPI = require('testlink-api-client/lib/testlinkapi.js');
var TestManager = require('./test_manager');

module.exports = TestLinkExecutorClient = function(testlinkapi) {
	this.testlinkapi = testlinkapi;
};

TestLinkExecutorClient.prototype = {

	execute : function(params, callback) {

		var exec = require('child_process').exec;
		exec('node ../cucumber/app.js ' + JSON.stringify(params), function(
				error, data, stderr) {
			callback(error, data, stderr);
		});
	},
	executeSuite : function(params, callback) {

		var filedownloadpath = "C:/Users/brahmanandak/Documents/BDD/features/";

		this.testlinkapi.getTestCasesForTestSuite(params, function(result) {
			result.map(function(testcase) {
				if (testcase.struct.external_id == "123-1") {
					params.testcaseid = testcase.struct.id;
					delete params.method;
					console.log(params);
					var externalid = testcase.struct.external_id;
					// console.log(testcase.struct.external_id+" id iod dod");
					new TestLinkAPI(params.devKey, params.rpcUrl)
							.getTestCaseAttachments({
								testcaseexternalid : externalid
							}, filedownloadpath, function() {
								new TestLinkClient().execute(params, callback);
							}, [ 'feature', 'js' ]);
				}
			});

		});
	},
	resultUpdate : function() {

		console.log("Result");
	}

};