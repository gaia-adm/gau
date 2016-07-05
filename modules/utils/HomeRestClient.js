'use strict';

import shared from '../../SharedConsts';

//goes to logout page since it automatically redirects to /login but also cleans gaia.it HttpOnly cookie
var GauLogin = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location=window.location.protocol+'//'+window.location.hostname+':88/sts/logout';
};

var GauLogout = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location=window.location.protocol+'//'+window.location.hostname+':88/sts/logout';
  return false;
};

var IsLoggedIn = function (callback) {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/verify',
    datatype: 'json',
    cache: false,
    success: function () {
      return callback(true);
    },
    error: function () {
      return callback(false);
    }
  })
};

exports.login = GauLogin;
exports.logout = GauLogout;
exports.verify = IsLoggedIn;

