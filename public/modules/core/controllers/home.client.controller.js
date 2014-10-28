'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Keywords', 'Types',
	function($scope, Keywords) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: []
      types: []
    };

    $scope.getKeywords = function() {
      var article = $scope.article;
      Keywords.get({content: article.text}, function(res) {
        article.keywords = res.keywords;
      });
    };

    $scope.getTypes = function() {
      var article = $scope.article;
      Types.get({keywords: article.keywords}, function(res) {
        console.log(res);
      });
    };

  
	}

]);