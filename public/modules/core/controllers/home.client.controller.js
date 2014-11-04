'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Keywords', 'Types',
	function($scope, Keywords) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: []
    };

    $scope.addKeyword = function(keyword, relevance, selected){
      relevance = relevance || 1;
      selected = selected || false;
      var newKeyword = {};
      newKeyword.text = keyword;
      newKeyword.relevance = relevance;
      newKeyword.selected = selected;
      $scope.article.keywords.push(newKeyword);
    };

    $scope.getKeywords = function() {
      var article = $scope.article;
      Keywords.get({content: article.text}, function(res) {
        var keys = res.keywords;
        for (var i=0; i<keys.length; i++){
          console.log(keys[i]);
          $scope.addKeyword(keys[i].text, keys[i].relevance);
        }
      });
    };

    // $scope.getTypes = function() {
    //   var article = $scope.article;
    //   Types.get({keywords: article.keywords}, function(res) {
    //     console.log(res);
    //   });
    // };

  
	}

]);