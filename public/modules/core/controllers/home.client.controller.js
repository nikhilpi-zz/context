'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Keywords',
	function($scope, $http, Keywords) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: []
    };

    $scope.getKeywords = function() {
      var article = $scope.article;
      Keywords.get({content: article.text}, function(res) {
        article.keywords = res.keywords
      });
    };

  
	}

]);