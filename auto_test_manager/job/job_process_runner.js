/**
 * New node file
 */

process.on('message', function(m) {
	switch (m.command) {
	case 'run':
		var TestManager = require('../../test_manager');
		var job = m.job;
		var jobRunner = new TestManager.JobManager.JobRunner(job);
		//console.log(jobRunner);
		jobRunner.run(function(results){
			process.exit(1);
		});
		//process.exit(1);

		break;
	default:
		throw new Error('command ' + m.command + ' is invalid');
	}
});