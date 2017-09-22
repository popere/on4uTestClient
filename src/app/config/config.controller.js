(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('ConfigController', ConfigController);

  /** @ngInject */
  function ConfigController(product, $state, tools) {


    var vm = this;

    vm.newUrlApi = product.getCurrentUrlApi();


    vm.save = function() {
      var result = product.modifyUrlApi(vm.newUrlApi);
      if(result){
        vm.returnToHome();
      }else{

      }
    };

    vm.reset = function() {
      product.resetUrlApi();
      vm.newUrlApi = product.getCurrentUrlApi();
    };

    vm.returnToHome = function() {
      tools.goToHome();
    };






  }
})();
