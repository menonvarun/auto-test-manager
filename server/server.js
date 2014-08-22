
var TestManager = require('../test_manager');
//var TestLinkClient = require("../api/test_manager_client/testlink/testlinkclient.js");
var Server = function(args){
	this.args = args;
};

Server.prototype = {
		init: function(){
			
		},
		handleSocket: function handleSocket(socket) {
			socket.on("exeByParam", function(params) {
				var factory = new TestManagerFactory(params);
				var client = factory.getClient();

				var method = params.method;
				switch (method) {
				case 'getProjects':
					client.getProjects(function(response) {
						socket.emit("getProjects", response);
						console.log(response);
					});
					break;
				case 'Authenticate':
					client.checkDevKey(params, function(response) {
						console.log(response);
						socket.emit("Authenticate", response);
					});

					break;
				case 'GetTestCasesFlagExecution':

					client.getTestCasesForTestSuite(params, function(response) {
						var out = [];
						response.map(function(testcase) {
							out.push({
								name : testcase.struct.name,
								external_id : testcase.struct.external_id
							});
						});
						socket.emit("GetTestCasesFlagExecution", response);
						console.log(response);
					});

					break;
				case 'ExecuteEntaireSuite':

					socket.emit("ExecuteEntaireSuite", response);
					break;
				case 'getBuildsForTestPlan':
					client.getBuildsForTestPlan(params, function(response) {
						console.log(response);
						socket.emit("getBuildsForTestPlan", response);
					});
					break;
				case 'getProjectTestPlans':
					client.getProjectTestPlans(params, function(response) {
						socket.emit("getProjectTestPlans", response);
						console.log(response);
					});
					break;
				case 'getTestCase':
					client.getTestCase(params, function(response) {
						console.log(response);
						socket.emit("getTestCase", response);
					});
					break;
				case 'getTestCasesForTestPlan':
					client.getTestCasesForTestPlan(params, function(response) {
						console.log(JSON.stringify(response));
						socket.emit("getTestCasesForTestPlan", response);
					});
					break;
				case 'getTestSuitesForTestSuite':
					client.getTestSuitesForTestSuite(params, function(response) {
						console.log(response);
						socket.emit("getTestSuitesForTestSuite", response);
					});

					break;
				case 'getTestSuitesForTestPlan':
					client.getTestSuitesForTestPlan(params, function(response) {
						console.log(response);
						socket.emit("getTestSuitesForTestPlan", response);
					});
				case 'Call server':

					var testclient = new TestLinkClient(client);
					console.log(testclient);
					testclient.executeSuite(params, function(error, data, stderr) {
						listener.sockets.emit('testlink1', data);
						console.log(error);
						console.log(data);

					});

					break;
				default:
				}

			});

		}
	};


module.exports = Server
		