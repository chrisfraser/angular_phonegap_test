(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('appSettings', appSettings);

    /** @ngInject */
    function appSettings() {

        var increments = {
            base: 12,
            body: 12,
            neck: 12,
            claw: 12
        };

        //var host = "http://192.168.4.1";

        var host = "http://192.168.4.1";

        var service = {
            increments: increments,
            host: host
        };

        return service;
    }
})();