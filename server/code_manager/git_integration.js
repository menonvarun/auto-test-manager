var git = require('gift');

var GitIntegration = function(){
	
};

GitIntegration.prototype = {
		clone : function clone(repo, folder){
			var cloneDone = false;
			git.clone(repo,folder,function(err){
				if(err) throw err;
				cloneDone = true;
			});
			var intvl = setInterval(function() {
			    if (cloneDone) { 
			        clearInterval(intvl);			        
			    }
			}, 100);
		}
		
};

module.exports = GitIntegration;