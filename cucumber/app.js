       console.log(process.argv[2]);
	   
	   var args=process.argv[2];
	   	 process.argv=[];
	   
	   
	   console.log(args);
	      console.log("//************************");
	   var args = args.replace(/[{}]/g, "");

	   var params={};
       var svalue="";
      
	   args.split(",").forEach(function(element){
         
       var arr=element.split(":");
        svalue="";
        var i=2
			for(;i<arr.length;i++)
			{
			svalue=svalue+":"+arr[i];
			}
	       params[arr[0]]=arr[1]+svalue;
	   
	   });
		 
			var cucu=require("../node_modules/cucumber/lib/cucumber.js");
			var TestFormater = require('./test_formatter');
			var testFormat = TestFormater({},params);
			var config = cucu.Cli.Configuration("")
			var runtime = cucu.Runtime(config);
			runtime.attachListener(testFormat);
			runtime.start(function(){});  
			