'use strict';

// Loading dependencies.
var mkdirp = require('mkdirp'),
    express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer');

// Ensuring our test uploads folder exists.
mkdirp.sync('./uploads', { mode: '0775' });

// Instantiating the framework and a router for our requests.
var app = express(),
    router = express.Router();

// The port which this script will listen to.
var serverPort = 4000;

// Application parses request bodies: application/json, application/x-www-form-urlencoded, and multipart/form-data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }));

// Attaching a middleware function for all routes which applies CORS headers to all responses.
router.use(function(request, response, next) {
    console.log('Request:', request.method, request.originalUrl);
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

// Route: File upload endpoint.
// Note:  Multer will automatically place the file in `uploads`.
router.post('/api/upload', function(request, response, next) {
    response.type('application/json');

    response.send(JSON.stringify({
        success: true
    }));

    next();
});

// Route: Homepage.
router.get('^/$', function(request, response) {
    response.render('homepage');
});

// Hook up the jade view engine to our application.
app.set('view engine', 'jade');
app.set('views', './views');
app.locals.pretty = true;

// Associate the router with our application.
app.use('/', router);

// Hosting the `assets` folder as a static directory of files.
app.use('/assets', express.static('assets'));

// Listen for the above routes on the following port.
app.listen(serverPort);

// Debugging to the console that the server has started.
console.log('Server: http://localhost:' + serverPort + '/');