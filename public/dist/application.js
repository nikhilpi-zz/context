'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'context';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$sce', 'Keywords', 'Types',
	function($scope, $sce, Keywords) {
    $scope.article = {
      text: 'lorem ipsum',
      keywords: [],
      getKeywords: function(){
        return this.keywords.map(function(k){return k.text;});
      }
    };

    $scope.state = '1';

    $scope.addKeyword = function(keyword, relevance, selected){
      relevance = relevance || 1;
      selected = selected || false;
      var newKeyword = {};
      newKeyword.text = keyword;
      newKeyword.relevance = parseFloat(relevance);
      newKeyword.selected = selected;
      $scope.article.keywords.push(newKeyword);
    };

    $scope.getKeywords = function() {
      var article = $scope.article;
      Keywords.get({content: article.text}, function(res) {
        var keys = res.keywords;
        for (var i=0; i<keys.length; i++){
          if (parseFloat(keys[i].relevance) > 0.8){
            $scope.addKeyword(keys[i].text, keys[i].relevance);
          }
        }
      });
      $scope.state = '2';
    };
  
	}

]);
'use strict';

angular.module('core').directive('articleText', [
	function() {
		return {
			templateUrl: 'modules/core/views/article-text.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);
'use strict';

angular.module('core').directive('instructions', [
	function() {
		return {
			templateUrl: 'modules/core/views/instructions.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Instructions directive logic
				// ...]
			}
		};
	}
]);
'use strict';

angular.module('core').directive('keywordSelection', [
	function() {
		return {
			templateUrl: 'modules/core/views/keyword-selection.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				
        
        scope.resetNewKeyword = function(){
          scope.newKeyword = null;
        };
        
			}
		};
	}
]);
'use strict';

angular.module('core').factory('Keywords', ['$resource', function($resource) {
		// Keywords service logic
		// ...

		// Public API
		return $resource('/api/getKeywords',{}, {
    	
  	});
	}
]);
'use strict';

angular.module('core').factory('Types', ['$resource', function($resource) {
		// Keywords service logic
		// ...

		// Public API
		return $resource('/api/getTypes',{}, {
    	
  	});
	}
]);