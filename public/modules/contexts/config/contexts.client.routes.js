'use strict';

//Setting up route
angular.module('contexts').config(['$stateProvider',
	function($stateProvider) {
		// Contexts state routing
		$stateProvider.
		state('listContexts', {
			url: '/contexts',
			templateUrl: 'modules/contexts/views/list-contexts.client.view.html'
		}).
		state('createContext', {
			url: '/contexts/create',
			templateUrl: 'modules/contexts/views/create-context.client.view.html'
		}).
		state('viewContext', {
			url: '/contexts/:contextId',
			templateUrl: 'modules/contexts/views/view-context.client.view.html'
		}).
		state('editContext', {
			url: '/contexts/:contextId/edit',
			templateUrl: 'modules/contexts/views/edit-context.client.view.html'
		});
	}
]);