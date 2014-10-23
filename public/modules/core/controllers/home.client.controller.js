'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: []
    };

    $scope.getKeyowrds = function(){

    };
	}

]);