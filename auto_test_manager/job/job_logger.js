var JobLogger = function(job){
	this.job = job;	
};

JobLogger.prototype = {
		log : function log(logData){
			throw "not implemented";
		}
};

module.exports = JobLogger;
