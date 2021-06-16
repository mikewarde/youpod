var http = require('http');
var fs = require('fs');
var shell = require('shelljs') 
var path  = require('path') 
const { generate_rss }  = require('./generate_rss.js');
const { parse } = require('querystring');
const XMLPATH = '/usr/share/nginx/html/'


function youtubedl(folder, url){
    let filePath = path.join(__dirname, folder);
    var command = `mkdir -p ${filePath} ;
	date=$(date +'%s') ;
	youtube-dl -i --write-info-json --download-archive archive.txt -w -f 'bestaudio[ext=m4a]' -x  --audio-format mp3 -o "./${folder}/\$\{date\}_%(id)s.%(ext)s" ${url}`;

	    console.log(command); 
	    if (shell.exec(command).code !== 0) {
	        shell.exit(1);
		return 1;
	    }
	    else {
		return 0;	
	    }
}


var server = http.createServer(function (req, res) {
    if (req.method === "GET") {
	let filePath = path.join(__dirname, `.${req.url}.xml`);
	if (fs.existsSync(filePath)) {
		var readStream = fs.createReadStream(filePath);
		readStream.pipe(res);
	} else {
		res.end('Not Found');
	}

    } else if (req.method === "POST") {
    
        var body = "";
        
	req.on("data", function (chunk) {
            body += chunk.toString();
        });


        req.on("end", function(){
	    console.log(parse(body));
	    console.log(parse(body).url); 
	    console.log(parse(body).listname);	
		if (youtubedl(parse(body).listname, parse(body).url) == 0) {
			let feed = generate_rss(parse(body).listname, XMLPATH); 
			console.log(feed); 			
			res.end('ok');
		} 
		else {
			res.end('Error');
		}

        });
    }

}).listen(3000);
