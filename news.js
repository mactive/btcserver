var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bitcoin');

var newsSchema = Schema({
  title   	: String,
  url 	  	: String,
  time 		: Date,
  origin 	: String,
  intro 	: String,
  no 		: String
});

var News = mongoose.model('News', newsSchema);

exports.getNewsBySkip = function (skip, callback){

	var skipNumber = parseInt(skip);
	console.log("skipNumber: "+ skipNumber);
	// get
	News
	.aggregate()
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



