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
var Content = require('./content');

var swig  = require('swig');


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

    }else if (pathname.match(new RegExp('^/content'))) {
        // give them them limit skip
        // return json 
        var aid = query.aid;
        Content.getContent(aid, function(err, item){
            res.writeHead(200, {'Content-Type':'text/html'});
            var tpl = swig.renderFile(folderPath+'/content_template.html', {
                title: item.title,
                content: item.content
            });

            res.write(tpl);
            res.end();
            return;
        });

    }else if(pathname.match(new RegExp('^/ticker'))){

        var req = http.get('http://www.hao123.com/bitcoin/bitcurrent', function(resGet) {
            resGet.setEncoding('utf8');
        });

        req.on('response', function (response) {

            var data = "";
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function(){
                res.writeHead(200, {'Content-Type':'application/json'});
                res.write(data);
                res.end();
            })

        });
       
    }else if(pathname.match(new RegExp('^/stats'))){
        http.get('http://www.btc123.com/e/interfaces/tickers.js?type=info',function(resGet){
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