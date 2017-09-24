(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('CreateController', CreateController);

  /** @ngInject */
  function CreateController($state, productService, $log, tools, toastr) {


    var vm = this;

    vm.product = {
      name: "",
      sku: "",
      price: ""
    };

    /**
     * Function to create a new product from inputs written and verifing them before the creation
     */
    vm.create = function() {
      var nameIsValid = vm.product && vm.product.name;
      var skuIsValid = vm.product && vm.product.sku;
      var price = vm.product && vm.product.price;

      var priceIsValid = price && price > 0;
      if(!priceIsValid){
        toastr.error('El precio del producto debe estar relleno y ser superior a 0.');
      }
      if(!skuIsValid){
        toastr.error('El SKU del producto debe estar relleno.');
      }
      if(!nameIsValid){
        toastr.error('El nombre del producto debe estar relleno.');
      }
      if(priceIsValid && skuIsValid && nameIsValid){
        productService.createProduct(vm.product).then(function(response){
          $log.info("Creation of product correct", response);
          tools.goToProducts();
          toastr.success('Creación del nuevo producto (SKU: ' + vm.product.sku +  ') con exito.');
        }).catch(function(error){
          $log.error(error);
          toastr.error('Error en la creación del nuevo producto (SKU: ' + vm.product.sku +  ').');
        });
      }

    };

    /**
     * Function to clear all inputs in create page
     */
    vm.removeAll = function() {
      vm.product = {
        name: "",
        sku: "",
        price: ""
      };
    };

    /**
     * Function to return to the products page.
     */
    vm.returnToHome = function() {
      tools.goToProducts();
    };

  }
})();
