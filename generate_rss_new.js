var fs = require('fs');
var path  = require('path');
var jq = require('jquery');
var shell = require('shelljs') 
var Podcast = require('podcast'); 
const DOMAIN = 'http://youpod.radged.com/';

function ffprobe(file){
    let command = `ffprobe -v quiet -print_format json  -show_streams ${file}`;
    return JSON.parse(shell.exec(command).stdout);  	
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
		itunesImage: DOMAIN+'/logo.png',
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


function generate_rss(folder ) {
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
			let mp3path = `${directoryPath}/${pjson.id}.mp3` 
			console.log(pjson);
			//console.log(ffprobe(mp3path).streams[0].duration) ;  
			//console.log('Adding item: ' + pjson.fulltitle); 
			//feed.addItem(
			//	feedItem(
			//		pjson.title		
			//	)
			//);	
		});
		
	
	return feed.buildXml(); 		
}
console.log(generate_rss('news'));

