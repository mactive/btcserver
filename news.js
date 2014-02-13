var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bitcoin');

var newsSchema = Schema({
  title   	: String,
  url 	  	: String,
  time 		: Date,
  origin 	: String,
  intro 	: String,
  no 		: String,
  aid		: Number,
  content	: String
});

var News = mongoose.model('News', newsSchema);

exports.getNewsBySkip = function (skip, callback){

	var skipNumber = parseInt(skip);
	console.log("skipNumber: "+ skipNumber);
	// get
	News
	.aggregate({ $project: { title: 1 , url:1, time:1, origin:1, intro:1 }})
	.sort({ time: 'desc'})
	.skip(skipNumber)
	.limit(20)
	.exec(function (err, items) {
		// body..
		if(err){
			console.dir(err);
		}
		console.log("News Skip"+skip);
		if (items) {
			callback(err, items);
		};
	});
}

exports.getContent= function (aid, callback){

	var aid = parseInt(aid);
	console.log("aid: "+ aid);
	// get
	
	News
	.findOne({'aid': aid })
	.exec(function (err, items) {
		// body..
		if(err){
			console.dir(err);
		}
		console.log("News aid:"+aid);
		if (items) {
			callback(err, items);
		};
	});
}



