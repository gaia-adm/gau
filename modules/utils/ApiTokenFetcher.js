import React from 'react'
import shared from '../../SharedConsts'

/**
 * Created by belozovs on 7/3/2016.
 */
'use strict';

var ApiTokenFetcher = function () {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/apitoken',
    datatype: 'json',
    cache: false,
    success: function (data) {
      console.log('Body: ' + JSON.stringify(data));
      sessionStorage.setItem('gaia.at.value', data.access_token);
      sessionStorage.setItem('gaia.at.birthday', new Date(Number(data.createdAt)));
      return null;
    },
    error: function (xhr, status, err) {
      console.error(xhr.url, status, err.toString());
      sessionStorage.removeItem('gaia.at.value');
      sessionStorage.removeItem('gaia.at.birthday');
      return (err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')');
    }
  });

};

module.exports = ApiTokenFetcher;