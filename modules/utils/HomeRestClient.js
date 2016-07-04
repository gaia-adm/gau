'use strict';

var GauLogin = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location='http://gaia-local.skydns.local:88/sts/login';
};

var GauLogout = function () {
  sessionStorage.removeItem('gaia.at.value');
  sessionStorage.removeItem('gaia.at.birthday');
  window.location='http://gaia-local.skydns.local:88/sts/logout';
  return false;
};


exports.login = GauLogin;
exports.logout = GauLogout;


