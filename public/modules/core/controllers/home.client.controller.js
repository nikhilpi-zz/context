'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
    $scope.getKeywords = function(text){
      // Simple GET request example :
      console.log('getting keywords');
      $http.get('http://knightlab-context.herokuapp.com/getKeywords', {params: {content: text}}).
        success(function(response) {
          console.log(response);
          $scope.keys = response.keywords;
        }).
        error(function(response) {
          console.log(response);
        });
    };
	}

]);