'use strict';

// Contexts controller
angular.module('contexts').controller('ContextsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Contexts',
	function($scope, $stateParams, $location, $http, Authentication, Contexts ) {
		$scope.authentication = Authentication;

		// Create new Context
		$scope.create = function() {
			// Create new Context object
			var context = new Contexts ({
				name: this.name
			});

			// Redirect after save
			context.$save(function(response) {
				$location.path('contexts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Update existing Context
		$scope.getKeywords = function() {
			var context = $scope.context ;
			console.log('hello');
			context.$getKeywords(function(response) {
				console.log(response);
			}, function(errorResponse) {
				console.log(errorResponse);
			});
		};

		// Remove existing Context
		$scope.remove = function( context ) {
			if ( context ) { context.$remove();

				for (var i in $scope.contexts ) {
					if ($scope.contexts [i] === context ) {
						$scope.contexts.splice(i, 1);
					}
				}
			} else {
				$scope.context.$remove(function() {
					$location.path('contexts');
				});
			}
		};

		// Update existing Context
		$scope.update = function() {
			var context = $scope.context ;

			context.$update(function() {
				$location.path('contexts/' + context._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contexts
		$scope.find = function() {
			$scope.contexts = Contexts.query();
		};

		// Find existing Context
		$scope.findOne = function() {
			$scope.context = Contexts.get({ 
				contextId: $stateParams.contextId
			});
		};
	}
]);