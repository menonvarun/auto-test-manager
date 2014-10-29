var TestManager = {};


module.exports = TestManager;

TestManager.Utils = require('./api/utils');
TestManager.FolderManager = require('./auto_test_manager/folder_manager');
TestManager.ArgumentParser = require('./auto_test_manager/argument_parser');
TestManager.JobManager = require('./auto_test_manager/job/job_manager');
TestManager.TestManagerFactory = require("./api/test_manager_client/test_manager_factory");
TestManager.ExecutorClientFactory = require("./api/executor_client/executor_client_factory");
TestManager.CodeManager = require("./auto_test_manager/code_manager/code_manager");
TestManager.CucumberRunner = require("./auto_test_manager/cucumber/cucumber_runner");

