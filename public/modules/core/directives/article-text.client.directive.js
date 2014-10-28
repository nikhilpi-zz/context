'use strict';

angular.module('core').directive('articleText', [
	function() {
		return {
			templateUrl: 'modules/core/views/article-text.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);