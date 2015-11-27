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
        templateUrl: 'app/views/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/views/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      })
      .state('appSettings', {
        url: '/appsettings',
        templateUrl: 'app/views/appSettings/appSettings.html',
        controller: 'AppSettingsController',
        controllerAs: 'appSettings'
      })
      .state('armSettings', {
        url: '/armsettings',
        templateUrl: 'app/views/armSettings/armSettings.html',
        controller: 'ArmSettingsController',
        controllerAs: 'armSettings'
      })
      .state('calibration', {
        url: '/calibration',
        templateUrl: 'app/views/calibration/calibration.html',
        controller: 'CalibrationController',
        controllerAs: 'calibration'
      })
      .state('armStart', {
        url: '/armStart',
        templateUrl: 'app/views/armStart/armStart.html',
        controller: 'ArmStartController',
        controllerAs: 'armStart'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
