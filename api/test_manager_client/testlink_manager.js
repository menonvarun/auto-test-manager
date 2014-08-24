var TestlinkApi  = require('testlink-api-client');
var TestlinkManager = function(params){
	this.client = new TestlinkApi(params.devKey, params.rpcUrl);
};

TestlinkManager.prototype = {
		downloadFeatureFiles : function downloadFeatureFiles(pathToDownload){
			/*this.client.getTestCasesForTestSuite(params, function(result) {
				result.map(function(testcase) {
					if (testcase.struct.external_id == "123-1") {
						params.testcaseid = testcase.struct.id;
						delete params.method;
						console.log(params);
						var externalid = testcase.struct.external_id;
						// console.log(testcase.struct.external_id+" id iod dod");
						this.client.getTestCaseAttachments({
									testcaseexternalid : externalid
								}, pathToDownload, function() {
									
								}, [ 'feature', 'js' ]);
					}
				});

			});*/
			
		}
};

module.exports = TestlinkManager;
