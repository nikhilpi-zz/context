'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
    $scope.hello = 'hi';

    $scope.getKeywords = function(text){
      // Simple GET request example :
      console.log('getting keywords');
      $http.get('/getKeywords', {content: text}).
        success(function(response) {
          console.log(response);
        }).
        error(function(response) {
          console.log(response);
        });
    };
	}

]);