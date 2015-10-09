(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('AppSettingsController', AppSettingsController);

    /** @ngInject */
    function AppSettingsController($scope, $element, $http, $window, $log, appSettings) {
        $scope.host = appSettings.host;
        $scope.navBack = function() {
            $window.history.back();
        };

        $scope.save = function(){
            appSettings.host = $scope.host
        }
    }
})();