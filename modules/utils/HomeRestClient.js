'use strict';

//goes to logout page since it automatically redirects to /login but also cleans gaia.it HttpOnly cookie
var GauLogin = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location=window.location.protocol+'//'+window.location.host+'/sts/logout';
};

var GauLogout = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location=window.location.protocol+'//'+window.location.host+'/sts/logout';
  return false;
};


exports.login = GauLogin;
exports.logout = GauLogout;


