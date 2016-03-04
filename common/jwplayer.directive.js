
(function(){
  /* global angular:false */
  /* jshint unused:false */

  /* Use this Directive to generate Directs via a ng-repeat loop */
  /* You can access to rSliders methods included on their documentarion by typing {ObjectYoDefinedForTheSlider}.rSlider. e.g: sldrObj.rSlider.updateSliderSize(); */

  'use strict';
  angular.module('retinaeApp')

  .directive('jwplayer', function($compile, $timeout, jwplayer){

    return {
      restrict: 'AEC',
      //template: '<video id="{{id}}" class="bg-video"><img src="http://content.jwplatform.com/thumbs/2YzdPtuC-1280.jpg" alt="Your browser does not support the video element."></video>',
      scope: {
        object:'=',
        aspectratio: '@',
        autostart: '@',
        controls: '@',
        logofile: '@',
        logomargin: '@',
        file: '@',
        id: '@playerId',
        image: '@',
        mute: '@',
        repeat: '@',
        width: '@'
      },
      template: function (element, scope, attrs) {
        var tpl;
        
        if(scope.type && scope.type == 'bg'){
          tpl = '<video id="{{id}}" class="bg-video"><img src="http://content.jwplatform.com/thumbs/2YzdPtuC-1280.jpg" alt="Your browser does not support the video element."></video>';
        }else{
          tpl = '<div></div><div id="{{id}}">Loading...</div>';
        }

        console.log(scope.type, scope.type);

        return tpl;
      },
      link: function (scope, element, attrs) {
        
        var createVideo = function(){

          scope.object = {};

          scope.videoObj = scope.object;

          var type = (attrs.type == "bg") ? 'background' : 'normal';

          //var t = jwplayer(scope.id);

          //console.log(scope.videoObj);

          scope.$emit('playerAssert', {
            obj: {
              object: scope.object,
              aspectratio: scope.aspectratio,
              autostart: scope.autostart,
              controls: scope.controls,
              logo: {file: scope.logofile, margin: scope.logomargin},
              file: scope.file,
              id: scope.id,
              image: scope.image,
              mute: scope.mute,
              repeat: scope.repeat,
              width: scope.width
            }, type: type
          });
        }

        $timeout(function(){
          createVideo();
        }, 100);
      }
    };
  });

})();

