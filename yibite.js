var Crawler = require("crawler").Crawler;
var urls = [];
var fs= require('fs');
var times  = 0;

var c = new Crawler({
	"maxConnections":1,

	// This will be called for each crawled page
	"callback": function(error,result,$) {

	    // $ is a jQuery instance scoped to the server-side DOM of the page
	    $(".right-intro a.art-myTitle").each(function(index,a) {
	        urls.push({
	        	url: a.href,
	        	title: a.innerHTML,
	        	no: index
	        });
	    });
	    times += 1;
	    console.log('call '+times+'times');
	}
});


function writeFs(urls){
	var data = {"news": urls };
    fs.writeFile('yibite.json', JSON.stringify(data), function (err) {
	  	if (err) throw err;
	  	console.log('It\'s saved!');
	});
}

// Queue just one URL, with default callback
var tasks = [];
var max = 5;
for (var i = 1; i < max; i++) {
	tasks.push({
		"uri": "http://www.yibite.com/news/index.php?page="+i,
		"callback": function(error,result,$) {
			$('.li-holder').each( function(index, div){
				var timeDiv = $(div).find('.tag-time > span');
				var linkDiv = $(div).find('.right-intro a.art-myTitle');

				console.log(linkDiv);
				console.log(linkDiv.innerHTML);
				
				urls.push({
		        	url: linkDiv.href,
		        	title: linkDiv.innerHTML,
		        	time: timeDiv.title,
		        	no: "page"+i+"-"+index
		        });

			});

		    times += 1;
		    console.log('queue call '+times+'times');
	    	writeFs(urls);
		}
	});
};

console.dir(tasks);

c.queue(tasks);


// TODO crawler pagination url
// TODO	insert the data
// TODO check the repeat
// TODO 定时任务