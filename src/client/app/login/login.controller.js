(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($auth) {
        var vm = this;

        vm.title = 'Login';

        vm.authenticate = function(provider) {
	      $auth.authenticate(provider).
	      	then(function(response) {
		    console.log(response);
		  });
	    };

    }
})();
