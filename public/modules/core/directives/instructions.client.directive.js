'use strict';

angular.module('core').directive('instructions', [
	function() {
		return {
			templateUrl: 'modules/core/views/instructions.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Instructions directive logic
				// ...]
			}
		};
	}
]);