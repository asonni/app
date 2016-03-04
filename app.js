/* global angular:false */
/*jshint unused:false */

(function () {
  'use strict';
  
  angular.module('retinaeApp', [
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'firebase'
    ])
    .constant('jwplayer', jwplayer)
    .constant('rackspace', {
      'thumbs': 'http://a050b39cebecda6d73f4-8d536b792eded622ed5aa7899ff7eb1b.r27.cf3.rackcdn.com/',
      'images': 'http://8caf97f57820bed9bcde-6573237daf8e03a5640f97f1b37b52dc.r52.cf3.rackcdn.com/',
      'images_mobile': 'http://2ecb93eeb02aec7f7f23-ddaae54791bc3cd095e8a8444e97de72.r14.cf3.rackcdn.com/',
      //'videos': 'http://f1bc7778405f27e9d564-7620cf1c2f93a8669fb01d1f221a5e8c.r68.cf3.rackcdn.com/',
      'videos': 'http://89c2256504a3768245b4-5289e2358cb20b9513af6ecfc144b1f5.r25.cf3.rackcdn.com/',
      'videos_local': 'assets/videos/videos-5s/',
      'videos_normal': 'http://8f71a213ff5334537846-baabf74b87248237e73c6970fe8ffc8c.r32.cf3.rackcdn.com/',
      'videos_mobile': 'http://e8c4ad1a8b8dd1fff549-873f0cafe91ebcfe20f03d10f70dcc17.r71.cf3.rackcdn.com/',
      'videos_placeholders': 'http://b214f6323fd00cd280dc-9428e6d9e3d1522751c4372a2b04d1f1.r53.cf3.rackcdn.com/'
    })
    .config(['$locationProvider', '$routeProvider', '$httpProvider' , function ($locationProvider, $routeProvider, $httpProvider) {
      //$httpProvider.defaults.withCredentials = true;
      $routeProvider
        .when('/', {
          templateUrl: 'common/page.tpl.html'
        })
        .when('/page/:page', {
          templateUrl: 'common/page.tpl.html'
        })
        .when('/register', {
          templateUrl: 'pages/register.tpl.html',
          controller: 'registerCtl'
        })
        .when('/login', {
          templateUrl: 'pages/login.tpl.html',
          controller: 'registerCtl'
        })
        .when('/error', {
          templateUrl: 'error/error-page.tpl.html'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(false).hashPrefix('!');

    }]).run(['$rootScope', function($root) {

      $root.$on('$routeChangeStart', function(e, curr) {});
      $root.$on('$routeChangeSuccess', function(e, curr) {});

    }]);

}());