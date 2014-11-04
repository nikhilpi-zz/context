'use strict';

angular.module('core').directive('keywordSelection', [
	function() {
		return {
			templateUrl: 'modules/core/views/keyword-selection.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				
        
        scope.resetNewKeyword = function(){
          scope.newKeyword = null;
        };
        
			}
		};
	}
]);