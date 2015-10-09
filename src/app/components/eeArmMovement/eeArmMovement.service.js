(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('eeArmMovement', eeArmMovement);

    /** @ngInject */
    function eeArmMovement($log, $http, appSettings) {

        var connected = false,
            busy = false,
            robot = {
                base: 90,
                body: 90,
                neck: 90,
                claw: 90
            };

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
                    robot.neck = 90;
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
            $log.debug(robot);
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

            $log.debug(robot);
            service.moveTo(robot);
        };

        service.moveTo = function(robot) {
            busy = true;
            $http(generatePostReq("/arm", {
                    base: robot.base,
                    body: robot.body,
                    neck: robot.neck,
                    claw: robot.claw
                }))
                .then(armRequestCompleteSetState)
                .catch(armRequestFailed);
        };

        service.addStep = function(delay) {
            busy = true;
            $http(generatePostReq("/add", {
                    base: robot.base,
                    body: robot.body,
                    neck: robot.neck,
                    claw: robot.claw,
                    steps: 0,
                    delay: delay
                }))
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

            $http.get(appSettings.host + "/play", {
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

        function armRequestCompleteSetState(response) {

            robot.base = response.data.base;
            robot.body = response.data.body;
            robot.neck = response.data.neck;
            robot.claw = response.data.claw;


            $log.debug(robot);

            connected = true;
            busy = false;
        }

        function armRequestFailed(error) {
            $log.error('Arm request failed.\n' + angular.toJson(error.data, true));
            busy = false;
        }

        function generatePostReq(url, data) {
            return {
                method: 'POST',
                url: appSettings.host + url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            };
        }
        return service;

    }
})();