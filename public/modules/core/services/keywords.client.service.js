'use strict';

angular.module('core').factory('Keywords', ['$resource', function($resource) {
		// Keywords service logic
		// ...

		// Public API
		return $resource('/api/getKeywords',{}, {
    	
  	});
	}
]);