'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Context Schema
 */
var ContextSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Context name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Context', ContextSchema);