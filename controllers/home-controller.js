'use strict';

var express = require('express');
var routerHC = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');
var bePath = require('../SharedConsts').bePath;

require('request').debug = false;


var serverName = process.env.SRV_DNS;
var subdomain = process.env.WH_SUBDOMAIN ? process.env.WH_SUBDOMAIN : ''; //webhook.
var port = subdomain ? '' : ':88';

routerHC.get('/'+bePath+'/login', function (req, res) {
  var options = {
    url: 'http://' + serverName,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  console.log(options.url);
  request.get(options, function (err, resRemote, body) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
    } else {
      if (resRemote.statusCode != HttpStatus.OK) {
        console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
      } else {
        console.log('Login sreen reached');
        res.status(HttpStatus.OK).send();
      }
    }
  });
});

routerHC.get('/'+bePath+'/logout', function (req, res) {
  var options = {
    url: 'http://' + serverName + port +'/sts/logout/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  console.log(options.url);
  request.get(options, function (err, resRemote, body) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
    } else {
      if (resRemote.statusCode != HttpStatus.OK) {
        console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
      } else {
        console.log('Logout succeeded');
        res.status(HttpStatus.OK).send();
      }
    }
  });
});


module.exports = routerHC;