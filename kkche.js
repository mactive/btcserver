/**
 * Created by mac on 13-10-29.
 */
var server,
    ip = "127.0.0.1",
    port = 8877,
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

    console.log(parts);
    console.log("=================");

    if(parts.pathname == '/vehicle')
    {
        if (query.vehicleType == "all") {
            
            filePath = folderPath + "/vehicle.json";
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
        };

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