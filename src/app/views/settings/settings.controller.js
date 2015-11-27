(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('SettingsController', SettingsController);

    /** @ngInject */
    function SettingsController($scope, $element, $http, $window, $log) {
        $scope.navBack = function() {
            $window.history.back();
        };
    }


})();