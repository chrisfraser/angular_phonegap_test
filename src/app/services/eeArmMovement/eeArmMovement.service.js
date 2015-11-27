(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('eeArmAPI', eeArmAPI);

    /** @ngInject */
    function eeArmAPI($log, $http, appSettings) {

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

            service.robot[joint] += appSettings.getIncrements()[joint];

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

            service.robot[joint] -= appSettings.getIncrements()[joint];

            if (service.robot[joint] < 0) {
                service.robot[joint] = 0;
            }

            $log.debug(service.robot);
            service.moveTo(service.robot);
        };

        service.moveTo = function(robot) {
            busy = true;
            return $http(generatePostReq("/arm", {
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

        service.getSettingsPromise = function() {
            busy = true;
            return $http(generateGetReq("/settings"))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.saveSettings = function(settings) {
            busy = true;
            return $http(generatePostReq("/settings", settings))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.setDefaultCalibration = function() {
            busy = true;
            return $http(generatePostReq("/setdefaultcalibration", null))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.saveCalibration = function(cal) {
            busy = true;
            
            var data = {
                ba_min: cal.base.min,
                ba_max: cal.base.max,
                bo_min: cal.body.min,
                bo_max: cal.body.max,
                n_min: cal.neck.min,
                n_max: cal.neck.max,
                c_min: cal.claw.min,
                c_max: cal.claw.max,
            };

            return $http(generatePostReq("/armcalibration", data))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        service.saveArmStart = function(robot) {
            busy = true;
            
            var data = {
                ba_start: robot.base,
                bo_start: robot.body,
                n_start: robot.neck,
                c_start: robot.claw
            };

            return $http(generatePostReq("/armstartposition", data))
                .then(armRequestComplete)
                .catch(armRequestFailed);
        };

        function armRequestComplete(response) {
            $log.debug(response);

            busy = false;

            return response;
        }

        function armRequestCompleteSetState(response) {
            $log.debug(response);

            service.robot.base = response.data.base;
            service.robot.body = response.data.body;
            service.robot.neck = response.data.neck;
            service.robot.claw = response.data.claw;

            connected = true;
            busy = false;

            return response;
        }

        function armRequestFailed(error) {
            $log.error('Arm request failed.\n' + angular.toJson(error.data, true));
            $log.debug(error);
            busy = false;
            connected = false;

            return error;
        }

        function generatePostReq(url, data, timeout) {
            return {
                method: 'POST',
                url: appSettings.getHost() + url,
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
                url: appSettings.getHost() + url,
                timeout: 2000,
                cache: false
            };
        }

        return service;
    }
})();