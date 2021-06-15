var fs = require('fs');
var path  = require('path');
var jq = require('jquery');
 
function generate_rss(folder) {
	const directoryPath = path.join(__dirname, folder);
	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('unable to scan: ' + err); 
		}

		files
		 .filter(el => path.extname(el) === '.mp3')
		 .forEach(function (file) {
			console.log(file)
			let json = fs.readFileSync(directoryPath 
				+'/' 
				+ file.substr(0, file.lastIndexOf('.')) + '.json');
			let pjson = JSON.parse(json);	 
			console.log(pjson); 
		});
	});
}

generate_rss('shite')
