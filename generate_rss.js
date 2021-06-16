var fs = require('fs');
var path  = require('path');
var jq = require('jquery');
var shell = require('shelljs') 
var Podcast = require('podcast'); 
const DOMAIN = 'http://youpod.radged.com/';

function ffprobe(file){
    //let command = `ffprobe -v quiet -print_format json  -show_streams ${file}`;
    let command = `ffprobe -v error -show_entries  format=duration -sexagesimal -print_format json ${file}`;
    shell.config.silent = true; 
	return JSON.parse(shell.exec(command).stdout, { silent: true } );  	
} 

function getFileSize(file){
    return fs.statSync(file).size;
}

function feedHead(folder){
	return {
		title: 'YouPod List ' + folder,
		description: 'All Your Youtube adds',
		feedUrl: '',
		siteUrl: '', 
	//	imageUrl
		language: 'en',
		author: '',
		itunesAuthor: 'YouPod',
		itunesSubtitle: 'All your Youtube Adds',
		itunesSummary: 'Videos you add using the Chrome plugin appear here as audio',
		itunesOwner: {
			name: 'mike',
			email: 'mike@mike.com'
		},
		itunesEmail: 'mike@mike.com',
		itunesExplicit: '',
		itunesCategory: [{text: 'Technology'}],
		itunesImage: DOMAIN+'logo.png',
		itunesType: '',
	};
}

function feedItem(title, desc, url, size, type, date, iDur, iSubTit, iAuth){
	return {
		title: title,
		description: desc,
		url: '',
		enclosure: {
			url: DOMAIN+url, 
			size: size,
			type: type,
		},
		guid: '',
		date: date,
		url: '',
		itunesTitle: title,
		itunesDuration: iDur,
		itunesSubtitle: iSubTit,
		itunesAuthor: iAuth,
		//content:encoded: '',
 	}
}

function generate_rss(folder, expath) {
	const directoryPath = path.join(__dirname, folder);

	const feed = new Podcast(feedHead(folder)); 

	//Loop through files in directory;
	files = fs.readdirSync(directoryPath);
		if (!files) {
			return console.log('unable to scan: ' + err); 
		}
		
		files
		 .filter(el => path.extname(el) === '.json')
		 .forEach(function (file) {
			let json = fs.readFileSync(directoryPath+'/'+file);
			let pjson = JSON.parse(json);	 
			let mp3file = `${file.substr(0, file.indexOf('.'))}.mp3`;
			let mp3path = `${directoryPath}/${mp3file}`;
			let filedateUTS = file.substr(0, file.indexOf('_')); 
			//console.log(filedateUTS); 		
			let filedate = new Date(file.substr(0, file.indexOf('_')) *1000);
			//console.log(filedate); 
			//console.log(mp3path); 
			//console.log('size ' +  getFileSize(mp3path)); 
			//console.log(pjson);
			//console.log(ffprobe(mp3path).format.duration) ;  
			//console.log('Adding item: ' + pjson.fulltitle); 
			feed.addItem(
				feedItem(
					pjson.title,
					pjson.description,
					folder+'/'+mp3file,
					getFileSize(mp3path),					
					type='audio/mpeg',
					date=filedate, 
					pjson.title,
					ffprobe(mp3path).format.duration,
					'',
					''	
				)
			);
		});
		
	try {
		fs.writeFileSync(expath+folder+'.xml', feed.buildXml()); 		
	} catch (err) {
		console.error(err); 
	}
}

module.exports = { generate_rss } ; 
