'use strict';

// Configuring the Articles module
angular.module('contexts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contexts', 'contexts', 'dropdown', '/contexts(/create)?');
		Menus.addSubMenuItem('topbar', 'contexts', 'List Contexts', 'contexts');
		Menus.addSubMenuItem('topbar', 'contexts', 'New Context', 'contexts/create');
	}
]);