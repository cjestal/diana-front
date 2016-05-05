(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController($timeout) {
        var vm = this;
        activate();

        function activate() {
            vm.questions = {
                question: "How are you",
                answerType: 'boolean'
            }
            vm.notifications = [
            {
                content: 'Click the image to reveal more information.'
            },
            {
                content: 'Click the image to reveal more information. Click the image to reveal more information.'
            }, {
                content: 'Click the image to reveal more information.Click the image to reveal more information. the image to reveal more information.t2'
            }, {
                content: 'Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.'
            }, {
                content: 'Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.'
            }, {
                content: 'Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.'
            }, {
                content: 'Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.Click the image to reveal more information.'
            }
            ]
        }


    }
})();
