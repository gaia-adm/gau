'use strict';

var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var request = require('request');

router.use('/gab/*', function (req, res, next) {
  console.log('Got request to backend: ' + req.originalUrl);
  next();
});

router.get('/gab/hello/:user?', function (req, res) {
  var user = req.params.user ? req.params.user : 'nobody';
  console.log('Send greetings to ' + user);
  res.status(HttpStatus.OK).json({message: 'Hello, '+user});
});

router.get('/gab/webhooks', function (req, res) {
  var token = req.get('Authorization');
  if(!token){
    console.log('Unauthorized request to ' + req.originalUrl);
    res.status(HttpStatus.UNAUTHORIZED).send();
  } else {
    var options={
      url: 'http://webhook.boris.gaiahub.io/wh/config/',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    };
    request.get(options, function (err, resRemote, body) {
      if(resRemote.statusCode != HttpStatus.OK){
        console.log('Error: ' + resRemote.statusMessage);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: resRemote.statusMessage});
      } else {
        console.log('Webhooks list received: '+body);
        res.status(HttpStatus.OK).json(JSON.parse(body));
      }
    });
  }
});

module.exports = router;