'use strict';

var express = require('express');
var routerWHC = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');
var shared = require('../SharedConsts');

var log4js = require('log4js');
var logger = log4js.getLogger('webhook-controller.js');

require('request').debug = false;

var whs = process.env.WH_SERVER ? process.env.WH_SERVER : 'whs.skydns.local:3000';

//for testing
routerWHC.use('/' + shared.bePath + '/*', function (req, res, next) {
  logger.trace('Got ' + req.method + ' request to backend: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  next();
});
//for testing
routerWHC.get('/' + shared.bePath + '/hello/:user?', function (req, res) {
  var user = req.params.user ? req.params.user : 'nobody';
  logger.trace('Send greetings to ' + user);
  res.status(HttpStatus.OK).json({message: 'Hello, ' + user});
});

//get all webhooks for the tenant
routerWHC.get('/' + shared.bePath + '/webhook', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://'+whs+'/wh/config/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    };
    request.get(options, function (err, resRemote, body) {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
      } else {
        if (resRemote.statusCode != HttpStatus.OK) {
          logger.error('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          logger.debug('Webhooks list received');
          res.status(HttpStatus.OK).json(JSON.parse(body));
        }
      }
    });
  }
});

//create new webhook
routerWHC.post('/' + shared.bePath + '/webhook', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://'+whs+'/wh/config/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-ORIG-SERVER': req.host,
        'Authorization': token
      },
      json: req.body
    };

    request.post(options, function (err, resRemote, body) {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
      } else {
        if (resRemote.statusCode != HttpStatus.OK) {
          logger.error('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          logger.debug('New webhook was created for '+req.body.datasource);
          res.status(HttpStatus.CREATED).json(body);
        }
      }
    });
  }
});

//delete webhook by id
routerWHC.delete('/' + shared.bePath + '/webhook/:id', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    if(!req.params.id){
      res.status(HttpStatus.BAD_REQUEST).json({message: 'webhook id is missing'});
    };
    var options = {
      url: 'http://'+whs+'/wh/config/'+req.params.id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    };
    request.delete(options, function (err, resRemote, body) {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
      } else {
        if (resRemote.statusCode != HttpStatus.NO_CONTENT) {
          logger.error('Error: ' + resRemote.statusMessage+'; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          logger.debug('Webhook deleted with id ' + req.params.id);
          res.status(HttpStatus.NO_CONTENT).send();
        }
      }
    });
  }
});

module.exports = routerWHC;