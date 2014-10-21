'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('2e76bbc542a2cc763bb5f2ffc0728850eb6c5c0d');

exports.getKeywords = function(req, res) {
  var keywords = [];
  alchemy.keywords(req.query.content, 'text',function(err, response) {
    if (err) throw err;
    keywords = response.keywords;
    res.jsonp({'keywords': keywords});
  });
};

