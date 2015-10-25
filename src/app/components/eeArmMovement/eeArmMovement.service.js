(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('eeArmMovement', eeArmMovement);

    /** @ngInject */
    function eeArmMovement($log, $http, appSettings) {

        var connected = false,
            busy = false;

        var service = {};

        service.robot = {
            base: 90,
            body: 90,
            neck: 90,
            claw: 90
        };

        // Todo: Use events here
        service.connected = connected;

        service.start = function() {
            busy = true;
            $http(generateGetReq("/arm"))
                .then(armRequestCompleteSetState)
                .catch(function() {
                    busy = false;
                });
        };

        service.increase = function(joint) {
            if (!connected || service.robot[joint] === 180 || busy) {
                return;
            }

            service.robot[joint] += appSettings.increments[joint];

            if (service.robot[joint] > 180) {
                service.robot[joint] = 180;
            }
            $log.debug(service.robot);
            service.moveTo(service.robot);
        };

        service.decrease = function(joint) {
            if (!connected || service.robot[joint] === 0 || busy) {
                return;
            }

            service.robot[joint] -= appSettings.increments[joint];

            if (service.robot[joint] < 0) {
                service.robot[joint] = 0;
            }

            $log.debug(service.robot);
            service.moveTo(service.robot);
        };

        service.moveTo = function(robot) {
            busy = true;
            $http(generatePostReq("/arm", {
                    base: service.robot.base,
                    body: service.robot.body,
                    neck: service.robot.neck,
                    claw: service.robot.claw
                }))
                .then(armRequestCompleteSetState)
                .catch(armRequestFailed);
        };

        service.addStep = function(delay) {
            busy = true;
            $http(generatePostReq("/add", {
                    base: service.robot.base,
                    body: service.robot.body,
                    neck: service.robot.neck,
                    claw: service.robot.claw,
                    steps: 0,
                    delay: delay
                }))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.saveSteps = function() {
            busy = true;
            $http(generatePostReq("/savesteps", null))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.clearLastStep = function() {
            busy = true;
            $http(generatePostReq("/pop", null))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.clearSteps = function() {
            busy = true;
            $http(generatePostReq("/clear", null))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.playSteps = function() {
            busy = true;

            $http(generatePostReq("/play", null))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.goToStart = function() {
            busy = true;
            $http(generatePostReq("/gostart", null, 4000))
                .then(armRequestCompleteSetState)
                .catch(armRequestFailed);
        };

        function armRequestComplete() {
            busy = false;
        }

        function armRequestCompleteSetState(response) {
            $log.debug("armRequestCompleteSetState", response);

            service.robot.base = response.data.base;
            service.robot.body = response.data.body;
            service.robot.neck = response.data.neck;
            service.robot.claw = response.data.claw;

            connected = true;
            busy = false;
        }

        function armRequestFailed(error) {
            $log.error('Arm request failed.\n' + angular.toJson(error.data, true));
            busy = false;
            connected = false;
        }

        function generatePostReq(url, data, timeout) {
            return {
                method: 'POST',
                url: appSettings.host + url,
                timeout: timeout || 2000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: data
            };
        }

        function generateGetReq(url) {
            return {
                method: 'GET',
                url: appSettings.host + url,
                timeout: 2000,
                cache: false
            };
        }
        return service;

    }
})();