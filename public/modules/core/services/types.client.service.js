'use strict';

angular.module('core').factory('Types', ['$resource', function($resource) {
		// Keywords service logic
		// ...

		// Public API
		return $resource('/api/getTypes',{}, {
    	
  	});
	}
]);