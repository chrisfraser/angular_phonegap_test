(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $timeout, $window, $rootScope, $state, $stateParams, cordovaReady) {
        cordovaReady(function() {
            $timeout(function() {
                $window.navigator.splashscreen.hide();
            }, 750);

        });
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $log.debug('runBlock end');
    }

})();