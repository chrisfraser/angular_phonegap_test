(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('CalibrationController', CalibrationController);

    /** @ngInject */
    function CalibrationController($scope, $element, $http, $window, $log, eeArmAPI) {
        var robot = {
            base: 90,
            body: 90,
            neck: 90,
            claw: 90
        };

        $scope.cal = {
            base: {min:70,max:110},
            body: {min:70,max:110},
            neck: {min:70,max:110},
            claw: {min:70,max:110}
        }

        $scope.fetched = true;

        $scope.selectedIndex = 0;

        $scope.navBack = function() {
            $window.history.back();
        };

        $scope.test = function(joint, value) {
            $log.debug(joint, value);

            robot[joint] = value;
            eeArmAPI.moveTo(robot);
        };

        $scope.next = function() {
            $scope.selectedIndex++;
        };

        $scope.start = function() {

            $scope.fetched = false;
            eeArmAPI.setDefaultCalibration().then(function(){
                $scope.fetched = true;
                $scope.selectedIndex++;
            });
            
        };

        $scope.save = function() {
            eeArmAPI.saveCalibration($scope.cal).then(function(result){
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