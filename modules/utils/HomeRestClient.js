'use strict';

import shared from '../../SharedConsts'

var GauLogin = function (callback) {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/login',
    datatype: 'json',
    cache: false,
    success: function () {
      //cookie should be removed by the server response as it is HttpOnly
      console.log('logged in');
      sessionStorage.removeItem('gaia.at.value');
      sessionStorage.removeItem('gaia.at.birthday');
      return callback(null);
    },
    error: function (xhr, status, err) {
      console.log('Failed to logout');
      console.error(xhr.url, status, err.toString());
      return callback((err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'));
    }
  })
};

var GauLogout = function (callback) {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/logout',
    datatype: 'json',
    cache: false,
    success: function () {
      //cookie should be removed by the server response as it is HttpOnly
      console.log('logged out');
      sessionStorage.removeItem('gaia.at.value');
      sessionStorage.removeItem('gaia.at.birthday');
      return callback(null);
    },
    error: function (xhr, status, err) {
      console.log('Failed to logout');
      console.error(xhr.url, status, err.toString());
      return callback((err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'));
    }
  })
};

exports.login = GauLogin;
exports.logout = GauLogout;


