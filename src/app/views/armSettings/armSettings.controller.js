(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('ArmSettingsController', ArmSettingsController);

    /** @ngInject */
    function ArmSettingsController($scope, $element, $http, $window, $log, eeArmAPI) {
        $scope.fetched = false;

        eeArmAPI.getSettingsPromise().then(function(response) {
            if (response.status > 0) {
                var settings = response.data;

                if (settings.mode === 1) {
                    settings.mode = 'STA';
                } else {
                    settings.mode = 'AP';
                }

                $scope.settings = settings;

                $scope.fetched = true;
            } else {
                $scope.navBack();
                toastr["error"]("Could not connect!");
            }
        });


        $scope.navBack = function() {
            $window.history.back();
        };

        $scope.save = function() {
            var settings = $scope.settings;
            settings.mode = settings.mode == 'STA' ? 1 : 0;

            eeArmAPI.saveSettings(settings).then(
                function() {
                    $scope.navBack();
                    toastr["success"]("Saved");
                },
                function() {
                    toastr["error"]("Error saving");
                }

            );
        };
    }
})();