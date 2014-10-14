'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var contexts = require('../../app/controllers/contexts');

	// Contexts Routes
	app.route('/contexts')
		.get(contexts.list)
		.post(users.requiresLogin, contexts.create);

	app.route('/contexts/:contextId')
		.get(contexts.read)
		.put(users.requiresLogin, contexts.hasAuthorization, contexts.update)
		.delete(users.requiresLogin, contexts.hasAuthorization, contexts.delete);

	// Finish by binding the Context middleware
	app.param('contextId', contexts.contextByID);
};