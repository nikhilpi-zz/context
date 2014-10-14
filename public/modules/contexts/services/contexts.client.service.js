'use strict';

//Contexts service used to communicate Contexts REST endpoints
angular.module('contexts').factory('Contexts', ['$resource',
	function($resource) {
		return $resource('contexts/:contextId', { contextId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);