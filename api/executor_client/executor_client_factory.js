
var ExecutorClientFactory = function() {

};

ExecutorClientFactory.prototype = {
	getExecutorClient : function getExecutorClient(params) {
		switch (params.tool) {
			case 'testlink':
				client = new TestLinkAPI(this.params.devKey, this.params.rpcUrl);
				break;
			default:
				throw "Client '" + this.params.tool
						+ "' not supported by the system";
		}
	}
};