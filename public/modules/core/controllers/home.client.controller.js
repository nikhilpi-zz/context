'use strict';


angular.module('core').controller('HomeController', ['$scope', '$sce', 'Keywords', 'Types',
	function($scope, $sce, Keywords) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: [],
      getKeywords: function(){
        return this.keywords.map(function(k){return k.text;});
      },
      addKeyword: function(keyword, relevance, selected){
        relevance = relevance || 1;
        selected = selected || false;
        var newKeyword = {};
        newKeyword.text = keyword;
        newKeyword.relevance = parseFloat(relevance);
        newKeyword.selected = selected;
        this.keywords.push(newKeyword);
      }
    };

    $scope.state = '1';

    $scope.getKeywords = function() {
      var article = $scope.article;
      Keywords.get({content: article.text}, function(res) {
        var keys = res.keywords;
        for (var i=0; i<keys.length; i++){
          if (parseFloat(keys[i].relevance) > 0.8){
            $scope.article.addKeyword(keys[i].text, keys[i].relevance);
          }
        }
      });
      $scope.state = '2';
    };

    $scope.getTypes = function() {
      $scope.state = '3';
    };
  
	}

]);