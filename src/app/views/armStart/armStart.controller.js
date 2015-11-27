(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('ArmStartController', ArmStartController);

    /** @ngInject */
    function ArmStartController($scope, $element, $http, $window, $log, eeArmAPI) {
        $scope.robot = {
            base: 90,
            body: 90,
            neck: 90,
            claw: 90
        };

        $scope.fetched = false;

        eeArmAPI.moveTo($scope.robot).then(function(response) {
            if (response.status > 0) {
                $scope.fetched = true;
            } else {
                $scope.navBack();
                toastr["error"]("Could not connect!");
            }
        });

        $scope.navBack = function() {
            $window.history.back();
        };

        $scope.test = function() {
            eeArmAPI.moveTo($scope.robot);
        };

        $scope.save = function() {
            eeArmAPI.saveArmStart($scope.robot).then(function(result){
                if(result.status > 0 ){
                    $scope.navBack();
                    toastr["success"]("Saved");
                } else{
                    toastr["error"]("Error saving");
                }
            })
        };
    }
})();