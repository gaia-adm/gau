'use strict';

var express = require('express');
var routerATC = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');
var bePath = require('../SharedConsts').bePath;

require('request').debug = false;


var serverName = process.env.SRV_DNS;
var subdomain = process.env.WH_SUBDOMAIN ? process.env.WH_SUBDOMAIN : ''; //webhook.
var port = subdomain ? '' : ':88';


//for testing
routerATC.use('/' + bePath + '/*', function (req, res, next) {
  console.log('Got ' + req.method + ' request to backend: ' + req.originalUrl);
  next();
});
//for testing
routerATC.get('/' + bePath + '/hello/:user?', function (req, res) {
  var user = req.params.user ? req.params.user : 'nobody';
  console.log('Send greetings to ' + user);
  res.status(HttpStatus.OK).json({message: 'Hello, ' + user});
});

//get my api token, if exists
routerATC.get('/' + bePath + '/apitoken', function (req, res) {
  var gCookie = req.cookies['gaia.it'];
  console.log('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + serverName + port + '/sts/facade/getmyapitoken/',
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
          console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          console.log('API token received: ' + body);
          res.status(HttpStatus.OK).json(JSON.parse(body));
        }
      }
    });
  }
});

//verify, if logged in (cookie set)
routerATC.get('/' + bePath + '/verify', function (req, res) {
  var gCookie = req.cookies['gaia.it'];
  console.log('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + serverName + port + '/sts/verify/',
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
          console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          console.log('API token verified');
          res.status(HttpStatus.OK).send();
        }
      }
    });
  }
});

//revoke token
routerATC.delete('/' + bePath + '/apitoken/:tokenValue', function (req, res) {
  //http://localhost:9001/sts/oauth/token/revoke?token=392df810-c616-4f8c-b190-604c9aaf85d8
  var tv = req.params.tokenValue;
  console.log('API Token revoke request is being handled...')
  var gCookie = req.cookies['gaia.it'];
  console.log('gaia.it cookie provided:' + gCookie);
  if (!gCookie) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + serverName + port + '/sts/oauth/token/revoke?token=' + tv,
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
        console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
      } else {
        console.log('API token revoked: ' + tv);
        res.status(HttpStatus.OK).send();
      }
    }
  })
});


module.exports = routerATC;