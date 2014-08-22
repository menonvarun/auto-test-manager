var TestLinkAPI = require('testlink-api-client/lib/testlinkapi.js');

module.exports = TestManagerFactory = function(params) {
	this.params = params;
};

TestManagerFactory.prototype = {

	getClient : function() {

		var client;
		switch (this.params.tool) {
		case 'testlink':
			client = new TestLinkAPI(this.params.devKey, this.params.rpcUrl);
			
			break;
		default:
			throw "Client '"+this.params.tool+"' not supported by the system";
		}

		return client;
	}

};

TestManagerFactory.TestLinkManager = require('./testlink_manager');
module.exports = TestManagerFactory;