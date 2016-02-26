var riffle = require('jsriffle');

riffle.setFabric(process.env.WS_URL);
riffle.setLogLevelInfo();

var domain = riffle.Domain(process.env.DOMAIN);

domain.onJoin = function() {
    console.log("ws:", process.env.WS_URL, "domain:", process.env.DOMAIN);
    this.register("echo", riffle.want(function(msg) {
        console.log("Echo: " + msg);
        return msg;
    }, String));
};

domain.join();
