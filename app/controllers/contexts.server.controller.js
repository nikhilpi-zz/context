'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Context = mongoose.model('Context'),
	_ = require('lodash');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('2e76bbc542a2cc763bb5f2ffc0728850eb6c5c0d');

/**
 * getKeywords
 */
exports.getKeywords = function(req, res) {
	console.log('getting keyopwrds');
	var context = req.context;
	var text = context.name;
	console.log(context);
	var keywords = 'error';
	alchemy.keywords(text, 'text',function(err, response) {
  	if (err) throw err;
  	keywords = response.keywords;
  	console.log(response.keywords);
	});
	res.jsonp(keywords);
};

/**
 * Create a Context
 */
exports.create = function(req, res) {
	var context = new Context(req.body);
	context.user = req.user;
	console.log(context);

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