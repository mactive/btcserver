/**
 * Created by mac on 13-10-29.
 */
var server,
    ip = "127.0.0.1",
    port = 8866,
    http = require('http'),
    fs = require('fs'),
    folderPath = "static",
    url = require('url'),
    encode = "utf8";
var New = require('./news');

server = http.createServer(function(req, res){
    var parts = url.parse(req.url, true);

    // Extract query.
    var query = parts.query;
    // Extract path name.
    var pathname = parts.pathname;
    // remove /btnnow
    pathname = pathname.replace('/btcnow','');

    var filePath = folderPath + pathname + '.json';

    console.log(pathname);

    if (pathname.match(new RegExp('^/news'))) {
        // give them them limit skip
        // return json 
        var skip = query.skip;
        New.getNewsBySkip(skip, function(err, news){
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify(news));
            res.end();
            return;
        });

    }else if(pathname.match(new RegExp('^/ticker'))){
        http.get('http://d.bitjin.com/ticker',function(resGet){
            // console.dir(res);
            resGet.on('data', function (chunk) {

                res.writeHead(200, {'Content-Type':'application/json'});
                res.write(chunk);
                res.end();
                return; 
            });
            
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

        
    }
    else{

        fs.readFile(filePath, encode, function(err, file) {
            if(err){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(file);
            res.end();
        });
    }



});

server.listen(port, ip);
console.log("Server running at http://"+ ip + ":"+port);