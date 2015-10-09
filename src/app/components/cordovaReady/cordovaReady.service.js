(function() {
  'use strict';
  angular
    .module('eeArmApp')
    .factory('cordovaReady', cordovaReady);

  /** @ngInject */
  function cordovaReady($window,$log) {
    return function(fn) {

      var queue = [];

      var impl = function() {
        queue.push(Array.prototype.slice.call(arguments));
      };

      $window.addEventListener('deviceready', function() {
        $log.debug('deviceready');
        queue.forEach(function(args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function() {
        return impl.apply(this, arguments);
      };
    };
  }
})();