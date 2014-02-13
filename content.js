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
		console.log("News Skip"+skip);
		if (items) {
			callback(err, items);
		};
	});
}



