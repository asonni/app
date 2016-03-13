/* global angular:false */
/*jshint unused:false */

(function () {
  'use strict';

  angular.module('retinaeApp')
  .factory('pagesService', ['$http', '$firebaseObject','firebaseUrl', function($http, $firebaseObject, firebaseUrl){
    var ref = new Firebase(firebaseUrl);
    var pages = {},
        data = $firebaseObject(ref.child('pages').child('data')),
    params = {
      format: 'jsonp',
      callback: 'JSON_CALLBACK'
    },
    promise = function(){
      return data.$loaded();
    };

    pages.data = pages.data || promise();
    console.log(pages.data);
    return pages.data;

  }])

  .factory('singlePageService', ['$http', function($http){

    var page = {},
    params = {
      format: 'jsonp',
      callback: 'JSON_CALLBACK'
    };

    page.getPage = function(id){

      var baseUrl = 'http://396d18a0dffca2b54a96-66a2272a3b41ab9c69858de1ce848721.r81.cf3.rackcdn.com/'; 

      var promise = $http({
        method: 'GET',
        url: baseUrl+id+'.json'
      }).success(function(data) {});
      return promise;
    };

    return page;

  }])

  .factory('tagsService', ['$http', function($http){
    var tags = {},
    params = {
      format: 'jsonp',
      callback: 'JSON_CALLBACK'
    },
    promise = function(){
      return $http({ 
        method: 'GET', 
        url: 'assets/data/tags.json',
        params: params
      });
    };

    tags.data = tags.data || promise();

    return tags.data;

  }])

}());