(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('ConfigController', ConfigController);

  /** @ngInject */
  function ConfigController(productService, toastr, tools) {


    var vm = this;

    vm.newUrlApi = productService.getCurrentUrlApi();

    /**
     * Function to save the configuration written in the input
     */
    vm.save = function() {
      if(vm.newUrlApi){
        var result = productService.modifyUrlApi(vm.newUrlApi);
        if(result){
          vm.returnToHome();
          toastr.success('Configuración guardada con éxito.');
        }
      }else{
        toastr.error('Por favor introduce la URL.');
      }

    };

    /**
     * Function to reset the configuration by default
     */
    vm.reset = function() {
      productService.resetUrlApi();
      vm.newUrlApi = productService.getCurrentUrlApi();
      toastr.success('Configuración restaurada con éxito.');
    };

    /**
     * Function to return to products page
     */
    vm.returnToHome = function() {
      tools.goToProducts();
    };

  }
})();
