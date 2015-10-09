(function() {
  'use strict';

  angular
    .module('eeArmApp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      })
      .state('appSettings', {
        url: '/appsettings',
        templateUrl: 'app/appSettings/appSettings.html',
        controller: 'AppSettingsController',
        controllerAs: 'appSettings'
      })
      .state('armSettings', {
        url: '/armsettings',
        templateUrl: 'app/armSettings/armSettings.html',
        controller: 'ArmSettingsController',
        controllerAs: 'armSettings'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
