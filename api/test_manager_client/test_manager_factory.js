var TestLinkAPI = require('testlink-api-client');


module.exports = TestManagerFactory = function(params) {
	this.params = params;
};

TestManagerFactory.TestLinkManager = require('./testlink_manager');
TestManagerFactory.FolderManagerClient = require('./folder_manager_client');

TestManagerFactory.prototype = {

	getClient : function() {

		var client;
		switch (this.params.tool) {
		case 'testlink':
			client = new TestManagerFactory.TestlinkManager(this.params);
			
			break;
		case 'folder':
			client = new TestManagerFactory.FolderManagerClient(this.params);
			break; 
			
		default:
			throw "Client '"+this.params.tool+"' not supported by the system";
		}

		return client;
	}

};

module.exports = TestManagerFactory;