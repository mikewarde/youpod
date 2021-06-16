var http = require('http');
var fs = require('fs');
var shell = require('shelljs') 
var path  = require('path') 

const { parse } = require('querystring');

function test(){
    var command = `date=$(date +'%s') ;	echo \$\{date\}_mike ;`  

	    console.log(command); 
	    if (shell.exec(command).code !== 0) {
	        shell.exit(1);
		return 1;
	    }
	    else {
		return 0;	
	    }
}

test();

