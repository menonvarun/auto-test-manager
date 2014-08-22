/**
 * New node file
 */
process.on('message', function(m) {
  switch (m.command) {
    case 'run':
    	var job = m.job;
    	job.startJob();    	
      
    default:
      throw new Error('command ' + m.command + ' is invalid');
  }
});