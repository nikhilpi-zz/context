'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('2e76bbc542a2cc763bb5f2ffc0728850eb6c5c0d');

var freebase= require('freebase');

exports.getKeywords = function(req, res) {
  var keywords = [];
  alchemy.keywords(req.query.content, 'text',function(err, response) {
    if (err) throw err;
    keywords = response.keywords;
    res.jsonp({'keywords': keywords});
  });
};

exports.getTypes = function(req, res) {
  var keywords = req.query.keywords;
  var types = [];
  for (var i in keywords){
    var type = freebase.type(i);
    types.push({'keyword': i, 'type': type});
  }
  res.jsonp({'types': types});
};

