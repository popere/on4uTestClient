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

    /**
     * Function to go to the home page
     * @private
     */
    function _goToHome() {
      $state.go("home");
    }

    /**
     * Function to go to the manage product page
     * @private
     */
    function _goToProducts() {
      $state.go("products");
    }


  }
})();
