'use strict';

angular.module('core').directive('selector', [
	function() {
		return {
			template: 'keyowrds.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Selector directive logic
				// ...

				element.text('this is the selector directive');
			}
		};
	}
]);