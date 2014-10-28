'use strict';

angular.module('core').directive('keywordSelection', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Keyword selection directive logic
				// ...

				element.text('this is the keywordSelection directive');
			}
		};
	}
]);