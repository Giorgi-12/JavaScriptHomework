var Router = function() {

    this.routes = {};

    this.add = function(route, callbacks, errorHandler) {
        this.routes[route] = {
            "callbacks": callbacks,
            "errorHandler": errorHandler
        };
    };

    this.remove = function(route) {
        delete this.routes[route];
    };

    this.handleRequest = function (request, response) {
        var url = request.url;
        var method = request.method.toLowerCase();
        var route = null;
        var params = null;
        for(var key in this.routes){
            var urlSplit = url.split('/');
            var keySplit = key.split('/');
            if(urlSplit.length == keySplit.length){
                var tmpParams = {};
                var success = true;
                for(var i=0; i<keySplit.length; i++){
                    if(keySplit[i].indexOf('{') == -1){
                        if(keySplit[i] != urlSplit[i]) {
                            success = false;
                            break;
                        }
                    } else {
                        if(keySplit[i].indexOf(':n') != -1){
                            if(isNaN(urlSplit[i])) {
                                success = false;
                                break;
                            }
                        }else {
                            if (!isNaN(urlSplit[i])) {
                                success = false;
                                break;
                            }
                        }
                    }
                    tmpParams[keySplit[i].substring(1, keySplit[i].indexOf(':'))] = ( isNaN(urlSplit[i]) ? urlSplit[i] : parseInt(urlSplit[i]) );
                }
                if (success) {
                    route = this.routes[key];
                    params = tmpParams;
                }
            }
        }

        if (route != null && method in route['callbacks'])
            route['callbacks'][method](request, response, params);
        else {
            response.writeHeader(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
            response.end();
        }
    };

};

var r = new Router();
r.add('/users/{id:n}/permissions/{permName:s}', {
    get: function(request, response, params) {
        response.writeHeader(200, {'Content-Type': 'text/plain'});
        response.write('test');
        response.end();
    }
});

var app = require('http');
app.createServer(function(request, response) {
    r.handleRequest(request, response);
}).listen(8080);