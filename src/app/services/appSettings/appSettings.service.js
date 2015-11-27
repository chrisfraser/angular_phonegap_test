(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('appSettings', appSettings);

    /** @ngInject */
    function appSettings($localStorage) {
        // Set defaults
        if (!$localStorage.settings) {
            $localStorage.settings = {
                increments: {
                    base: 12,
                    body: 12,
                    neck: 12,
                    claw: 12
                },
                host: "http://192.168.4.1"
            }
        }

        var service = {
            getIncrements: getIncrements,
            getHost: getHost,
            saveHost: saveHost
        };

        function getHost() {
            return $localStorage.settings.host;
        }

        function saveHost(host) {
            $localStorage.settings.host = host;
        }

        function getIncrements() {
            return $localStorage.settings.increments;
        }

        return service;
    }
})();