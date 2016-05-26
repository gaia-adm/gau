'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var log4js = require('log4js');

log4js.replaceConsole();
if (process.env.LOG_LEVEL) {
    log4js.setGlobalLogLevel(process.env.LOG_LEVEL);
} else {
    log4js.setGlobalLogLevel('DEBUG');
}
var logger = log4js.getLogger('server');

var app=express();
app.set('port', (process.env.PORT || 4000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    //Set permissive CORS header - looks like a security breach when used with asterix
    res.set('Access-Control-Allow-Origin','*');
    //Disable caching
    res.set('Cache-Control', 'no-cache');
    next();
});

app.listen(app.get('port'), function () {
    logger.info('React-ws server has started on port ' + app.get('port'));
});


