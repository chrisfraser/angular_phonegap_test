(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('BottomSheet', BottomSheet);

    /** @ngInject */
    function BottomSheet($scope, $mdBottomSheet, $log, eeArmMovement) {


        $scope.addStep = function() {
            eeArmMovement.addStep(500);
            $mdBottomSheet.hide();
        };

        $scope.saveSteps = function() {
            eeArmMovement.saveSteps();
            $mdBottomSheet.hide();
        };

        $scope.clearLastStep = function() {
            eeArmMovement.clearLastStep();
            $mdBottomSheet.hide();
        };

        $scope.clearSteps = function() {
            eeArmMovement.clearSteps();
            $mdBottomSheet.hide();
        };

        $scope.playSteps = function() {
            eeArmMovement.playSteps();
            $mdBottomSheet.hide();
        };

        $scope.goToStart = function() {
            eeArmMovement.goToStart();
            $mdBottomSheet.hide();
        };
    }


})();