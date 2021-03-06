var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

module.exports = function (controller, bot) {

    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // webserver.use(express.static('public'));
    webserver.use(express.static(path.join(__dirname, 'public')));

    

    // You can pass in whatever hostname you want as the second argument
    // of the express listen function, it defaults to 0.0.0.0 aka localhost 
    webserver.listen(process.env.PORT || 3000, function (app) {

        console.log('Express webserver configured and listening at ',
            process.env.HOSTNAME || 'http://localhost' + ':' + (process.env.PORT || 3000));

        

    });
    // Register our routes, in this case we're just using one route
    // for all incoming requests from FB
    // We are passing in the webserver we created, and the botkit
    // controller into our routes file so we can extend both of them 
    require('./webhook_routes.js')(webserver, controller)

    controller.webserver = webserver;


    return webserver;
}





