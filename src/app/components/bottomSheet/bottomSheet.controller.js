(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('BottomSheet', BottomSheet);

    /** @ngInject */
    function BottomSheet($scope, $mdBottomSheet, $log, eeArmAPI) {


        $scope.addStep = function() {
            eeArmAPI.addStep(500);
            $mdBottomSheet.hide();
        };

        $scope.saveSteps = function() {
            eeArmAPI.saveSteps();
            $mdBottomSheet.hide();
        };

        $scope.clearLastStep = function() {
            eeArmAPI.clearLastStep();
            $mdBottomSheet.hide();
        };

        $scope.clearSteps = function() {
            eeArmAPI.clearSteps();
            $mdBottomSheet.hide();
        };

        $scope.playSteps = function() {
            eeArmAPI.playSteps();
            $mdBottomSheet.hide();
        };

        $scope.goToStart = function() {
            eeArmAPI.goToStart();
            $mdBottomSheet.hide();
        };
    }


})();