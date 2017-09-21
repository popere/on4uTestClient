(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
