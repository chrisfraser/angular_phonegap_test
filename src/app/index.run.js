(function() {
	'use strict';

	angular
		.module('eeArmApp')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $timeout, $window, cordovaReady) {
		cordovaReady(function() {
			if ($window.navigator.splashscreen) {
				$timeout(function() {
					$window.navigator.splashscreen.hide();
				}, 750);
			}
		});

		$log.debug('runBlock end');
	}

})();