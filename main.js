var riffle = require('jsriffle');
var fs = require('fs');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

domain.onJoin = function() {
    console.log("ws:", process.env.WS_URL, "domain:", process.env.DOMAIN);
    fs.readFile('./test.txt', function(err, fileData) {
        if(err) {
            return console.log("file read error:", err);
        }

        console.log(fileData.toString().replace(/ing/g, "ssssssss"));
    });
    
    this.register("echo", riffle.want(function(msg) {
        console.log("Echo: " + msg);
        return msg;
    }, String));
};

domain.join();
