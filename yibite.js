var Crawler = require("crawler").Crawler;
var urls = [];
var fs= require('fs');

var c = new Crawler({
	"maxConnections":10,

	// This will be called for each crawled page
	"callback":function(error,result,$) {

	    // $ is a jQuery instance scoped to the server-side DOM of the page
	    $(".right-intro a.art-myTitle").each(function(index,a) {
	        c.queue(a.href);
	        urls.push({
	        	url: a.href,
	        	title: a.innerHTML
	        });
	    });
	    console.dir(urls);
	    writeFs(urls);
	}
});


function writeFs(urls){
	var data = {"urls": urls };
    fs.writeFile('yibite.json', JSON.stringify(data), function (err) {
	  	if (err) throw err;
	  	console.log('It\'s saved!');
	});
}

// Queue just one URL, with default callback
c.queue("http://yibite.node-crawler.com");


// TODO crawler pagination url
// TODO	insert the data
// TODO check the repeat
// TODO 定时任务