(function() {
  'use strict';

  angular
	.module('app.login')
	.controller('LoginController', LoginController);

	/* @ngInject */
	function LoginController($auth, $window, $rootScope, $state ) {
		var vm = this;

		vm.authenticate = function(provider) {
			$auth.authenticate(provider).
			then(function(response) {
				$window.localStorage.userInfo = JSON.stringify(response.data);
				$rootScope.currentUser = JSON.parse($window.localStorage.userInfo).name;
				$state.go('dashboard');
			});
		};

	}
})();
