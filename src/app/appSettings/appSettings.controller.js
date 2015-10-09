(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('AppSettingsController', AppSettingsController);

    /** @ngInject */
    function AppSettingsController($scope, $element, $http, $window, $log, eeArmMovement) {
        $scope.navBack = function() {
            $window.history.back();
        };
    }


})();