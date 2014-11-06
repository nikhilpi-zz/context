'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
  var analyser = require('../../app/controllers/analyser');
  app.route('/api/getKeywords').get(analyser.getKeywords);
  app.route('/api/getTypes').get(analyser.getTypes);
};