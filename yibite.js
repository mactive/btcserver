var Crawler = require("crawler").Crawler;
var urls = [];
var fs= require('fs');
var times  = 0;

var c = new Crawler({
	"maxConnections": 1,	
});


function writeFs(urls){
	var data = {"news": urls };
    fs.writeFile("yibite.json", JSON.stringify(data), function (err) {
	  	if (err) throw err;
	  	console.log('It\'s saved!');
	});
}

// Queue just one URL, with default callback
var tasks = [];
var max = 20;
for (var i = 1; i <= max; i++) {
	tasks.push({
		"maxConnections": 1,
		"uri": "http://yibite.com/news/index.php?page="+i,
		"callback": function(error,result,$) {
			// urls = [];

			$('.li-holder').each( function(index, div){
				var timeDiv = $(div).find('.tags > span.time')[0];
				var linkDiv = $(div).find('.right-intro > a.art-myTitle')[0];
				var originDiv = $(div).find('.tags > a.author')[0];
				var introDiv = $(div).find('.right-intro > span.intro')[0];

				urls.push({
		        	url: linkDiv.href,
		        	title: linkDiv.innerHTML,
		        	time: timeDiv.innerHTML,
		        	origin: originDiv.innerHTML,
		        	intro: introDiv.innerHTML,
		        	no: "page"+times+"-"+index
		        });
				console.log("page"+times+"-"+index);
			});

		    times += 1;
		    console.log('queue call '+times+' times');
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