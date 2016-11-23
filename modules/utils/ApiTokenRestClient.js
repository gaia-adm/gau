import shared from '../../SharedConsts'

/**
 * Created by belozovs on 7/3/2016.
 */
'use strict';

var ApiTokenFetcher = function (callback) {
  $.ajax({
    type: 'GET',
    url: '/' + shared.bePath + '/apitoken?st=' + sessionStorage.getItem(shared.selectedTenant),
    datatype: 'json',
    cache: false,
    success: function (data) {
      console.log('Body: ' + JSON.stringify(data));
      sessionStorage.setItem('gaia.at.value', data.access_token);
      sessionStorage.setItem('gaia.at.birthday', new Date(Number(data.createdAt)));
      return callback(null);
    },
    error: function (xhr, status, err) {
      console.error(xhr.url, status, err.toString());
      sessionStorage.removeItem('gaia.at.value');
      sessionStorage.removeItem('gaia.at.birthday');
      return callback((err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'));
    }
  });

};

function ApiTokenRevoker(callback) {
  var tokenToDelete = sessionStorage.getItem('gaia.at.value');
  if(!tokenToDelete){
    console.log('No API Token for the client - nothing to delete');
    return callback(null);
  } else {
    $.ajax({
      type: 'DELETE',
      url: '/' + shared.bePath + '/apitoken/'+tokenToDelete,
      datatype: 'json',
      cache: false,
      success: function () {
        sessionStorage.removeItem('gaia.at.value');
        sessionStorage.removeItem('gaia.at.birthday');
        return callback(null)
      },
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        return callback((err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'));
      }
    });
  }
}

exports.fetch = ApiTokenFetcher;
exports.revoke = ApiTokenRevoker;