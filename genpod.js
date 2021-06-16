var Podcast =  require('podcast');

const feed = new Podcast({
	title: 'test',
	description: 'test desc',
	feedUrl: '',
	siteUrl: '', 
//	imageUrl
	language: 'en',
	author: '',
	itunesAuthor: 'itunes author',
	itunesSubtitle: 'tunes subtiele',
	itunesSummary: 'this is my feed',
	itunesOwner: {
		name: 'mike',
		email: 'mike@mike.com'
	},
	itunesEmail: 'mike@mike.com',
	itunesExplicit: '',
	itunesCategory: [{text: 'Technology'}],
	itunesImage: 'https://mysteriousuniverse.org/wp-content/uploads/2013/02/plus_1400.jpg',
	itunesType: '',
});

feed.addItem({
	title: 'test_item1',
	description: 'test desc 1',
	url: '',
	enclosure: {
		url: 'http://traffic.libsyn.com/40igmwokfls/MUP23.23_HQ_SAJDFBLASGBNALG.mp3', 
		size: '259117230',
		type: 'audio/mpeg',
	},
	guid: '',
	date: 'Jun 16, 2021',
	url: '',
	itunesTitle: 'my_itunes_titls',
	itunesDuration: '1:47:20',
	itunesSubtitle: 'itunes subtitle',
	itunesAuthor: 'itunes author',
	//content:encoded: '',

});

console.log(feed.buildXml());  
