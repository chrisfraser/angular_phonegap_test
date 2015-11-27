(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $timeout, $window, $rootScope, $state, $stateParams, $cordovaSplashscreen) {
        // Make sure that cordova is running and the plugin is there
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Splashscreen) {
            $timeout(function() {
                $cordovaSplashscreen.hide();
            }, 750);
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $log.debug('runBlock end');
    }

})();