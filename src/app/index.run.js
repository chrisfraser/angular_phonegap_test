(function() {
  'use strict';

  angular
    .module('eeArmApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
