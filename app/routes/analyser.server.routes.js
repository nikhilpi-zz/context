'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
  var analyser = require('../../app/controllers/analyser');
  app.route('/getKeywords').get(analyser.getKeywords);
};