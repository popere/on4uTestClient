(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('EditController', EditController);

  /** @ngInject */
  function EditController($state, product, $log, $stateParams) {


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


      product.editProduct(vm.productModified).then(function(response){
          $log.info("Edit of product correct", response);
          vm.returnToHome();
      }).catch(function(error){
        $log.error(error);
      });
    };

    vm.reset = function() {
      vm.product = vm.productBefore;
    };

    vm.returnToHome = function() {
      $state.go("home");
    };




  }
})();
