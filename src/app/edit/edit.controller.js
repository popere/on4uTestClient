(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('EditController', EditController);

  /** @ngInject */
  function EditController($state, product, $log, $stateParams, tools) {


    var vm = this;

    vm.productModified = {
      name: "",
      sku: "",
      price: ""
    };

    loadProduct();

    function loadProduct() {
      var productId = parseInt($stateParams.productId);
      product.getProduct(productId).then(function(product){
          vm.productModified = product;
          vm.productBefore = product;
      }).catch(function(error){
        $log.error(error);
      });
    }

    vm.edit = function() {
      //validation of everything is completed in product

      var index = parseInt(vm.productModified.id);
      product.updateProduct(index, vm.productModified).then(function(response){
          $log.info("Edit of product correct", response);
          tools.goToHome();
      }).catch(function(error){
        $log.error(error);
      });
    };

    vm.reset = function() {
      vm.product = vm.productBefore;
    };

    vm.returnToHome = function() {
      tools.goToHome();
    };
  }
})();
