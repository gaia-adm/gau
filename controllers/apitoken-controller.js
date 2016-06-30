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
  if (false) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + subdomain + serverName + port + '/sts/facade/getmyapitoken/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': "gaia.it="+gCookie
      }
    };
    request.get(options, function (err, resRemote, body) {
      if (err) {
        //TODO - boris: prevent endless loop, if no cookie provided
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


module.exports = routerATC;