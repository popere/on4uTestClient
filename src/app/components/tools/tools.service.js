(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .factory('tools', toolsService);

  /** @ngInject */
  function toolsService($state) {

    var service = {
      goToHome : _goToHome,
      goToProducts : _goToProducts

    };

    return service;

    function _goToHome() {
      $state.go("home");
    }

    function _goToProducts() {
      $state.go("products");
    }


  }
})();
