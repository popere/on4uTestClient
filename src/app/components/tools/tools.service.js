(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .factory('tools', toolsService);

  /** @ngInject */
  function toolsService($state) {

    var service = {
      goToHome : _goToHome
    };

    return service;

    function _goToHome() {
      $state.go("products");
    }


  }
})();
