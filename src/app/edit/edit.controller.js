(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('EditController', EditController);

  /** @ngInject */
  function EditController(toastr, productService, $log, $stateParams, tools) {


    var vm = this;

    vm.productModified = {
      name: "",
      sku: "",
      price: ""
    };

    loadProduct();

    /**
     * Function to load all products in the DB
     */
    function loadProduct() {
      var productId = parseInt($stateParams.productId);
      productService.getProduct(productId).then(function(product){
          vm.productModified = product;
          vm.productBefore = product;
      }).catch(function(error){
        $log.error(error);
      });
    }

    /**
     * Function to modify a product already existing
     */
    vm.edit = function() {
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
        var index = parseInt(vm.productModified.id);
        productService.updateProduct(index, vm.productModified).then(function(response){
          $log.info("Edit of product correct", response);
          tools.goToProducts();
          toastr.success('Modificación del producto (SKU: ' + vm.product.sku +  ') con éxito.');
        }).catch(function(error){
          $log.error(error);
          toastr.success('Error durante la modificación del producto (SKU: ' + vm.product.sku +  ').');
        });
      }

    };

    /**
     * Function to reset all inputs fields about the product
     */
    vm.reset = function() {
      vm.product = vm.productBefore;
    };

    /**
     * Function to return to home
     */
    vm.returnToHome = function() {
      tools.goToProducts();
    };
  }
})();
