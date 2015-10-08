(function() {
	'use strict';

	angular
		.module('eeArmApp')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log) {
		if (navigator.splashscreen) {
			setTimeout(function() {
				navigator.splashscreen.hide();
			}, 750);
		}
		$log.debug('runBlock end');
	}

})();