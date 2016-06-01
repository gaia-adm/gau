'use strict';

var express = require('express');
var router = express.Router();

router.get('/gab/hello', function (req, res) {
  res.status(204).send();
});

module.exports = router;