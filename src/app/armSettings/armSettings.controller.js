(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('ArmSettingsController', ArmSettingsController);

    /** @ngInject */
    function ArmSettingsController($scope, $element, $http, $window, $log, eeArmMovement) {
        $scope.navBack = function() {
            $window.history.back();
        };
    }
})();