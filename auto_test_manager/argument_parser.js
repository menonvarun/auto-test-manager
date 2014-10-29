var ArgumentParser = function(argv) {
	var nopt = require("nopt");

	var supportedOptions = {
		"port" : [ Number, null ],
		"folder" : [ String, null ]
	};

	var shortOptions = {
		"p" : [ "--port" ],
		"fld" : [ "--folder" ]
	};
	
	options = nopt(supportedOptions,shortOptions, argv,2);
	var self = {
			getPort : function getPort(defaultPort){
				return self._getOptionOrDefaultValue("port",1000);
			},
			
			getFolderPath : function getFolderPath(){
				return self._getOptionOrDefaultValue("folder",self._getUserHome());
			},
			
			_getUserHome : function _getUserHome() {
				  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
			},
			
			_getOptionOrDefaultValue : function _getOptionOrDefaultValue(optionName, defaultValue){
				var optionValue = options[optionName];
			    return (typeof(optionValue) != 'undefined' ? optionValue : defaultValue);
			}
			
	};
	return self;
};

module.exports = ArgumentParser;