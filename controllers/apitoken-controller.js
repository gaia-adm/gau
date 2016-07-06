'use strict';

var express = require('express');
var routerATC = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');
var shared = require('../SharedConsts');

var log4js = require('log4js');
var logger = log4js.getLogger('apitoken-controller.js');

require('request').debug = false;


var sts = process.env.AUTH_SERVER ? process.env.AUTH_SERVER : 'sts.skydns.local:8080';
logger.debug('STS is on ' + sts);

//for testing
routerATC.use('/' + shared.bePath + '/*', function (req, res, next) {
  logger.debug('Got ' + req.method + ' request to backend: ' + req.originalUrl);
  next();
});
//for testing
routerATC.get('/' + shared.bePath + '/hello/:user?', function (req, res) {
  var user = req.params.user ? req.params.user : 'nobody';
  logger.trace('Send greetings to ' + user);
  res.status(HttpStatus.OK).json({message: 'Hello, ' + user});
});

//get my api token, if exists
routerATC.get('/' + shared.bePath + '/apitoken', function (req, res) {
  var gCookie = req.cookies['gaia.it'];
  logger.debug('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://'+sts+'/sts/facade/getmyapitoken/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': "gaia.it=" + gCookie
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
          logger.debug('API token received');
          res.status(HttpStatus.OK).json(JSON.parse(body));
        }
      }
    });
  }
});

//verify, if logged in (cookie set)
routerATC.get('/' + shared.bePath + '/verify', function (req, res) {
  var gCookie = req.cookies['gaia.it'];
  logger.trace('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://'+sts+'/sts/verify/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': "gaia.it=" + gCookie
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
          logger.debug('API token verified');
          res.status(HttpStatus.OK).send();
        }
      }
    });
  }
});

//revoke token
routerATC.delete('/' + shared.bePath + '/apitoken/:tokenValue', function (req, res) {
  //http://localhost:9001/sts/oauth/token/revoke?token=392df810-c616-4f8c-b190-604c9aaf85d8
  var tv = req.params.tokenValue;
  logger.info('API Token revoke request is being handled...')
  var gCookie = req.cookies['gaia.it'];
  logger.debug('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    logger.error('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://'+sts+'/sts/oauth/token/revoke?token=' + tv,
      method: 'DELETE',
      'HEADERS': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': "gaia.it=" + gCookie
      }
    }
  }
  ;
  request.delete(options, function (err, resRemote, body) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
    } else {
      if (resRemote.statusCode != HttpStatus.OK) {
        logger.error('Error: ' + resRemote.statusMessage + '; called ' + options.url);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
      } else {
        logger.info('API token revoked: ' + tv);
        res.status(HttpStatus.OK).send();
      }
    }
  })
});


module.exports = routerATC;