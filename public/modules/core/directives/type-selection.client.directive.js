'use strict';

angular.module('core').directive('typeSelection', [
	function() {
		return {
			templateUrl: 'modules/core/views/type-selection.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Type selection directive logic
				// ...
			}
		};
	}
]);