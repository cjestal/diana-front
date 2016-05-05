(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper, $rootScope, $auth, $window) {
    // check if user is already logged in
    $rootScope.isAuthenticated = $auth.isAuthenticated();
    if ($rootScope.isAuthenticated) {
        $rootScope.currentUser = JSON.parse($window.localStorage.userInfo);
    }
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: '404',
        config: {
          url: '/404',
          templateUrl: 'app/core/404.html',
          title: '404'
        }
      }
    ];
  }
})();
