(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $element, $http, $mdSidenav, $mdBottomSheet, $log, eeArmMovement) {

        $scope.increase = function(joint) {
            eeArmMovement.increase(joint);
            $log.debug("Robot: \n" + angular.toJson(eeArmMovement.getRobot(), true));
        };

        $scope.decrease = function(joint) {
            eeArmMovement.decrease(joint);
        };

        $scope.addStep = function() {
            eeArmMovement.addStep(500);
        };

        $scope.saveSteps = function() {
            eeArmMovement.saveSteps();
        };

        $scope.clearLastStep = function() {
            eeArmMovement.clearLastStep();
        };

        $scope.clearSteps = function() {
            eeArmMovement.clearSteps();
        };

        $scope.playSteps = function() {
            eeArmMovement.playSteps();
        };

        $scope.goToStart = function() {
            eeArmMovement.goToStart();
        };

        $scope.connect = function(){
            eeArmMovement.start();
        };

        $scope.resizeContent = function() {
            var backgroundWidth = 1024,
                backgroundHeight = 1124;

            var contentWidth = $element.find('#content').width(),
                contentHeight = $element.find('#content').height();

            var aspectRatio = backgroundWidth / backgroundHeight;

            // Check if content is too tall
            if (contentHeight > contentWidth / aspectRatio) {
                contentHeight = contentWidth / aspectRatio;
            }

            // Check if content is too wide
            if (contentWidth > contentHeight * aspectRatio) {
                contentWidth = contentHeight * aspectRatio;
            }

            $scope.contentWidth = contentWidth;
            $scope.contentHeight = contentHeight;
        };

        $scope.openSideNav = function() {
            $mdSidenav('left').open();
        };

        $scope.openBottomSheet = function() {
            $mdBottomSheet.show({
                templateUrl: 'app/components/bottomSheet/bottomSheet.html',
                parent: "#main"
            });
        };
        
        $scope.resizeContent();
        eeArmMovement.start();
    }


})();