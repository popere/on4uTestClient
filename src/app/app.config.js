(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-bottom-center';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

})();
