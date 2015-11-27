(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $element, $http, $timeout, $mdSidenav, $mdBottomSheet, $log, eeArmAPI) {
        $scope.indicators = {};

        $scope.$watch(function () { return eeArmAPI.connected; }, function (connected) {
            $scope.connected = connected;
        });

        $scope.increase = function(joint) {
            eeArmAPI.increase(joint);
            flashIndicator(joint);
        };

        $scope.decrease = function(joint) {
            eeArmAPI.decrease(joint);
            flashIndicator(joint);
        };

        $scope.addStep = function() {
            eeArmAPI.addStep(500);
        };

        $scope.saveSteps = function() {
            eeArmAPI.saveSteps();
        };

        $scope.clearLastStep = function() {
            eeArmAPI.clearLastStep();
        };

        $scope.clearSteps = function() {
            eeArmAPI.clearSteps();
        };

        $scope.playSteps = function() {
            eeArmAPI.playSteps();
        };

        $scope.goToStart = function() {
            eeArmAPI.goToStart();
        };

        $scope.connect = function() {
            eeArmAPI.start();
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
        eeArmAPI.start();

        function flashIndicator(joint) {
            $scope.indicators[joint] = true;
            $timeout(function() {
                $scope.indicators[joint] = false;
            }, 200);
        }
    }


})();