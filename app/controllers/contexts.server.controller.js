'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Context = mongoose.model('Context'),
	_ = require('lodash');

/**
 * Create a Context
 */
exports.create = function(req, res) {
	var context = new Context(req.body);
	context.user = req.user;

	context.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(context);
		}
	});
};

/**
 * Show the current Context
 */
exports.read = function(req, res) {
	res.jsonp(req.context);
};

/**
 * Update a Context
 */
exports.update = function(req, res) {
	var context = req.context ;

	context = _.extend(context , req.body);

	context.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(context);
		}
	});
};

/**
 * Delete an Context
 */
exports.delete = function(req, res) {
	var context = req.context ;

	context.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(context);
		}
	});
};

/**
 * List of Contexts
 */
exports.list = function(req, res) { Context.find().sort('-created').populate('user', 'displayName').exec(function(err, contexts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contexts);
		}
	});
};

/**
 * Context middleware
 */
exports.contextByID = function(req, res, next, id) { Context.findById(id).populate('user', 'displayName').exec(function(err, context) {
		if (err) return next(err);
		if (! context) return next(new Error('Failed to load Context ' + id));
		req.context = context ;
		next();
	});
};

/**
 * Context authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.context.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};