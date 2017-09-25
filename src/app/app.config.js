(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // http config
    $httpProvider.defaults.headers.common["Accept"] = "application/json" ;
    $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
    $httpProvider.defaults.headers.put["Content-Type"] = "application/json; charset=utf-8";

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
  }

})();
