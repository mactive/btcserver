/**
 * Created by mac on 13-10-29.
 */
var server,
    ip = "192.168.199.194",
    port = 8866,
    http = require('http'),
    fs = require('fs'),
    folderPath = "static",
    url = require('url'),
    encode = "utf8";
var swig    = require('swig');


server = http.createServer(function(req, res){
    var parts = url.parse(req.url, true);

    // Extract query.
    var query = parts.query;
    // Extract path name.
    var pathname = parts.pathname;
    // remove /btnnow
    // pathname = pathname.replace('/btcnow','');
    var filePath = '';
    // var filePath = folderPath + pathname + '.json';

    // console.log(query);
    // console.log("=================");

    if(query.action == 'list')
    {
        filePath = folderPath + "/wukongtvlist.json";
        console.log(filePath);
        console.log("=================");

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
    if(query.action == 'html')
    {
        filePath = folderPath + "/wukong_template.html";
        // console.log(filePath);
        fs.readFile(filePath, encode, function(err, file) {
            if(err){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(file);
            res.end();
        });
    }




});

server.listen(port, ip);
console.log("Server running at http://"+ ip + ":"+port);