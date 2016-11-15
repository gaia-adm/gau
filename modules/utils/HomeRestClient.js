'use strict';

import shared from '../../SharedConsts';

//goes to logout page since it automatically redirects to /login but also cleans gaia.it HttpOnly cookie
var GauLogin = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location='https://'+window.location.hostname+':444/sts/logout';
};

var GauLogout = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location='https://'+window.location.hostname+':444/sts/logout';
  return false;
};

var IsLoggedIn = function (callback) {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/verify',
    datatype: 'json',
    cache: false,
    success: function (data) {
      var isAccountAdminId = data.accounts[0].role_ids.indexOf(1);
      if(isAccountAdminId > -1) {
        return callback(true);
      } else {
        console.error('User ' + data.firstName + ' ' + data.lastName + ' is not authorized to access Admin UI');
        return callback(false);
      }
    },
    error: function () {
      console.error('User is not authenticated');
      return callback(false);
    }
  })
};

exports.login = GauLogin;
exports.logout = GauLogout;
exports.verify = IsLoggedIn;

