'use strict';

var express = require('express');
var routerWHC = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');
var bePath = require('../SharedConsts').bePath;

require('request').debug = false;

var serverName = process.env.SRV_DNS;


//for testing
routerWHC.use('/' + bePath + '/*', function (req, res, next) {
  console.log('Got ' + req.method + ' request to backend: ' + req.originalUrl);
  next();
});
//for testing
routerWHC.get('/' + bePath + '/hello/:user?', function (req, res) {
  var user = req.params.user ? req.params.user : 'nobody';
  console.log('Send greetings to ' + user);
  res.status(HttpStatus.OK).json({message: 'Hello, ' + user});
});

//get all webhooks for the tenant
routerWHC.get('/' + bePath + '/webhook', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + serverName + '/wh/config/',
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
          console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          console.log('Webhooks list received: ' + body);
          res.status(HttpStatus.OK).json(JSON.parse(body));
        }
      }
    });
  }
});

//create new webhook
routerWHC.post('/' + bePath + '/webhook', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options = {
      url: 'http://' + serverName + '/wh/config/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      json: req.body
    };

    request.post(options, function (err, resRemote, body) {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: err.message});
      } else {
        if (resRemote.statusCode != HttpStatus.OK) {
          console.log('Error: ' + resRemote.statusMessage + '; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          console.log('Webhooks list received: ' + JSON.stringify(body));
          res.status(HttpStatus.CREATED).json(body);
        }
      }
    });
  }
});

//delete webhook by id
routerWHC.delete('/' + bePath + '/webhook/:id', function (req, res) {
  var token = req.get('Authorization');
  if (!token) {
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    if(!req.params.id){
      res.status(HttpStatus.BAD_REQUEST).json({message: 'webhook id is missing'});
    };
    var options = {
      url: 'http://' + serverName + '/wh/config/'+req.params.id,
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
          console.log('Error: ' + resRemote.statusMessage+'; called ' + options.url);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
        } else {
          res.status(HttpStatus.NO_CONTENT).send();
        }
      }
    });
  }
});

module.exports = routerWHC;