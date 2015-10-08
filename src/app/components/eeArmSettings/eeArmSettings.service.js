(function() {
    'use strict';

    angular
        .module('eeArmApp')
        .factory('eeArmSettings', eeArmSettings);

    /** @ngInject */
    function eeArmSettings($log, $http) {


        var service = {
            getSettings: getSettings,
            saveSettings: saveSettings
        };

        return service;

        function getSettings() {
        }

        function saveSettings() {
        }

    }
})();