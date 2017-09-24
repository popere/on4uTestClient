(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('CreateController', CreateController);

  /** @ngInject */
  function CreateController($state, product, $log, tools) {


    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1506010660881;
    vm.product = {
      name: "",
      sku: "",
      price: ""
    };

    vm.create = function() {
      //validation of everything is completed in product


      product.createProduct(vm.product).then(function(response){
          $log.info("Creation of product correct", response);
          tools.goToProducts();
      }).catch(function(error){
        $log.error(error);
      });
    };

    vm.removeAll = function() {
      vm.product = {
        name: "",
        sku: "",
        price: ""
      };
    };


    vm.returnToHome = function() {
      tools.goToProducts();
    };




  }
})();
