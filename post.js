var http = require('http');
var fs = require('fs');
var shell = require('shelljs') 
var path  = require('path') 
const { generate_rss }  = require('./generate_rss.js');
const { parse } = require('querystring');
const XMLPATH = '/usr/share/nginx/html/'


async function youtubedl(folder, url, callback){
    let filePath = path.join(__dirname, folder);
    var command = `mkdir -p ${filePath} ;
	date=$(date +'%s') ;
	youtube-dl -i --write-info-json --download-archive archive.txt -w -f 'bestaudio[ext=m4a]' -o "./${folder}/\$\{date\}_%(id)s.%(ext)s" ${url}`;
	    console.log(command); 
		try {
			shell.exec(command).code
			callback(folder, XMLPATH);
		}	 catch (err) {
			console.log(err); 
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

		// data streaiming in 	
		req.on("data", function (chunk) {
				body += chunk.toString();
			});

		//End of request
		req.on("end", function(){
			try {
				youtubedl(parse(body).listname, parse(body).url, generate_rss); 
				res.end('ok');
			
			} catch (err) {
				res.end('Error');
			}

		});
	}
}).listen(3000);
