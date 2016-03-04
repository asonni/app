/* global angular:false */
/*jshint unused:false */

(function () {
  'use strict';

  angular.module('retinaeApp')
  .factory('VideoTools', ['$http', 'jwplayer', function($http, jwplayer){
    
    var VT = {};

    VT.params = {};

    var logoFile = {file: "assets/imgs/retinae-logo-white-video.png", margin: 15}

    VT.getPlayerParams = function(){
      var params = {
        background: {
          id: 'playerbg',
          aspectratio: "16:9",
          autostart: false,
          repeat: true,
          controls: false,
          logo: false,
          file: null,
          image: null,
          mute: true,
          width: "100%"
        },
        normal: {
          id: 'player',
          aspectratio: "16:9",
          autostart: false,
          repeat: false,
          controls: false,
          logo: logoFile,
          file: null,
          image: null,
          mute: false,
          width: "100%"
        }
      }
      return params;
    }

    VT.setPlayerObjects = function(objts){
      var types = {'background': {}, 'normal': {}};
      var params = getParams();
      
      $.each(objts, function(key, val){
        objts[key] = jwplayer(val.id).setup({
          aspectratio: val.aspectratio,
          autostart: val.autostart,
          repeat: val.repeat,
          controls: val.controls || true,
          logo: val.logo,
          file: val.file,
          image: val.image,
          mute: val.mute,
          width: val.width
        });
      })

      console.log(objts);
      return objts;
    }
    
    VT.player = 'AAA';

    return VT;

  }])

}());