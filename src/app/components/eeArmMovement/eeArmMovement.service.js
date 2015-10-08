(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('eeArmMovement', eeArmMovement);

    /** @ngInject */
    function eeArmMovement($log, $http, appSettings) {

        var connected = false,
            busy = false,
            robot = {};

        var service = {};

        service.getRobot = function() {
            return robot;
        };
        
        service.start = function() {
            busy = true;
            $http.get(appSettings.host + "/arm", {
                    timeout: 5000,
                    cache: false
                })
                .then(armRequestCompleteSetState)
                .catch(function() {
                    busy = false;
                    connected = true;
                    robot.base = 90;
                    robot.body = 90;
                    robot.neck = 0;
                    robot.claw = 90;
                });
        };

        service.increase = function(joint) {
            if (!connected || robot[joint] === 180 || busy) {
                return;
            }

            robot[joint] += appSettings.increments[joint];

            if (robot[joint] > 180) {
                robot[joint] = 180;
            }

            service.moveTo(robot);
        };

        service.decrease = function(joint) {
            if (!connected || robot[joint] === 0 || busy) {
                return;
            }

            robot[joint] -= appSettings.increments[joint];

            if (robot[joint] < 0) {
                robot[joint] = 0;
            }

            service.moveTo(robot);
        };

        service.moveTo = function(robot) {
            busy = true;
            $http.post(appSettings.host + "/arm", {
                    base: robot.base,
                    body: robot.body,
                    neck: robot.neck,
                    claw: robot.claw
                }, {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestCompleteSetState)
                .catch(armRequestFailed);
        };

        service.addStep = function(delay) {
            busy = true;
            $http.post(appSettings.host + "/add", {
                    base: robot.base,
                    body: robot.body,
                    neck: robot.neck,
                    claw: robot.claw,
                    steps: 0,
                    delay: delay
                }, {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.saveSteps = function() {
            busy = true;
            $http.get(appSettings.host + "/savesteps", {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.clearLastStep = function() {
            busy = true;
            $http.get(appSettings.host + "/pop", {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.clearSteps = function() {
            busy = true;
            $http.get(appSettings.host + "/clear", {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.playSteps = function() {
            busy = true;

            $http.get(appSettings.host + "/go", {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.goToStart = function() {
            busy = true;
            $http.get(appSettings.host + "/gostart", {
                    timeout: 1000,
                    cache: false
                })
                .then(armRequestCompleteSetState)
                .catch(armRequestFailed);
        };

        function armRequestComplete() {
            busy = false;
        }

        function armRequestCompleteSetState(data) {
            robot.base = data.base;
            robot.body = data.body;
            robot.neck = data.neck;
            robot.claw = data.claw;

            busy = false;
        }

        function armRequestFailed(error) {
            $log.error('Arm request failed.\n' + angular.toJson(error.data, true));
            busy = false;
        }


        return service;

    }
})();