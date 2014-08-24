var TestManager = {};


module.exports = TestManager;

TestManager.Utils = require('./api/utils');
TestManager.FolderManager = require('./server/folder_manager');
TestManager.ArgumentParser = require('./server/argument_parser');
TestManager.JobManager = require('./server/job/job_manager');
TestManager.TestManagerFactory = require("./api/test_manager_client/test_manager_factory");
TestManager.ExecutorClientFactory = require("./api/executor_client/executor_client_factory");
TestManager.CodeManager = require("./server/code_manager/code_manager");
TestManager.CucumberRunner = require("./server/cucumber/cucumber_runner");

