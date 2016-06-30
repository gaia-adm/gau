'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var log4js = require('log4js');

log4js.replaceConsole();
if (process.env.LOG_LEVEL) {
  log4js.setGlobalLogLevel(process.env.LOG_LEVEL);
} else {
  log4js.setGlobalLogLevel('DEBUG');
}
var logger = log4js.getLogger('server');

var compression = require('compression')
var app = express();
// ~3 times difference in bundle download size
app.use(compression());
app.set('port', (process.env.PORT || 4000));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var uiPath = require('./SharedConsts').uiPath;
app.use(require('./controllers/webhook-controller'));
app.use(require('./controllers/apitoken-controller'));


// add trailing slash for just a root context url so that /css will work with catch-all routing below
app.use('*', function (req, res, next) {
  if (req.originalUrl.endsWith(uiPath)) {
    res.redirect(301, req.originalUrl + '/');
  } else {
    next();
  }
});

// Catch-all routing: send all requests to index.html so browserHistory works
app.use('/' + uiPath + '/*', function (req, res) {
  //Does not work - going to index.html to ensure that clean urls working on refresh
  /*    //Set permissive CORS header - looks like a security breach when used with asterix
   res.set('Access-Control-Allow-Origin','*');
   //Disable caching
   res.set('Cache-Control', 'no-cache');*/
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(app.get('port'), function () {
  logger.info('React-ws server has started on port ' + app.get('port'));
});


