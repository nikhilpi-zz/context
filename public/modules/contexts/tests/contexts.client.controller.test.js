'use strict';

(function() {
	// Contexts Controller Spec
	describe('Contexts Controller Tests', function() {
		// Initialize global variables
		var ContextsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Contexts controller.
			ContextsController = $controller('ContextsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Context object fetched from XHR', inject(function(Contexts) {
			// Create sample Context using the Contexts service
			var sampleContext = new Contexts({
				name: 'New Context'
			});

			// Create a sample Contexts array that includes the new Context
			var sampleContexts = [sampleContext];

			// Set GET response
			$httpBackend.expectGET('contexts').respond(sampleContexts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contexts).toEqualData(sampleContexts);
		}));

		it('$scope.findOne() should create an array with one Context object fetched from XHR using a contextId URL parameter', inject(function(Contexts) {
			// Define a sample Context object
			var sampleContext = new Contexts({
				name: 'New Context'
			});

			// Set the URL parameter
			$stateParams.contextId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contexts\/([0-9a-fA-F]{24})$/).respond(sampleContext);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.context).toEqualData(sampleContext);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contexts) {
			// Create a sample Context object
			var sampleContextPostData = new Contexts({
				name: 'New Context'
			});

			// Create a sample Context response
			var sampleContextResponse = new Contexts({
				_id: '525cf20451979dea2c000001',
				name: 'New Context'
			});

			// Fixture mock form input values
			scope.name = 'New Context';

			// Set POST response
			$httpBackend.expectPOST('contexts', sampleContextPostData).respond(sampleContextResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Context was created
			expect($location.path()).toBe('/contexts/' + sampleContextResponse._id);
		}));

		it('$scope.update() should update a valid Context', inject(function(Contexts) {
			// Define a sample Context put data
			var sampleContextPutData = new Contexts({
				_id: '525cf20451979dea2c000001',
				name: 'New Context'
			});

			// Mock Context in scope
			scope.context = sampleContextPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contexts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contexts/' + sampleContextPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contextId and remove the Context from the scope', inject(function(Contexts) {
			// Create new Context object
			var sampleContext = new Contexts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contexts array and include the Context
			scope.contexts = [sampleContext];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contexts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContext);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contexts.length).toBe(0);
		}));
	});
}());