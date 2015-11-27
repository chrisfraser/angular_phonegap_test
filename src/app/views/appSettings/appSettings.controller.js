(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('AppSettingsController', AppSettingsController);

    /** @ngInject */
    function AppSettingsController($scope, $element, $http, $window, $log, appSettings, toastr) {
        $scope.host = appSettings.getHost();
        
        $scope.navBack = function() {
            $window.history.back();
        };

        $scope.save = function(){
            appSettings.saveHost($scope.host);
            $scope.navBack();
            toastr["success"]("Saved");
        }
    }
})();