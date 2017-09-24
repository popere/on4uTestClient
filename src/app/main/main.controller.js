(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, product, $log, $state) {


    var vm = this;

    vm.creationDate = 1506010660881;
    vm.showToastr = showToastr;
    vm.products = [];
    vm.order = {
      category : "sku",
      direction : "+"
    };

    activate();

    function activate() {
      loadProducts();
    }

    vm.orderBy = function(newCategoryOrder) {
      if(vm.order.category === newCategoryOrder){
        vm.order.direction = vm.order.direction === "+" ? "-" : "+";
      } else {
        vm.order.category = newCategoryOrder;
        vm.order.direction = "+";
      }
      toastr.info('TOTO');
    };

    vm.isOrdered = function(direction, category) {
      return direction === vm.order.direction && category === vm.order.category;
    };

    vm.createProduct = function() {
      $state.go("create");
    };

    vm.modify = function(product) {
      $state.go("edit", {"productId": product.id});
    };

    vm.delete = function(productToDelete) {
      product.deleteProduct(productToDelete.id).then(function(response){
          $log.info("Delete of product has been done, product deleted:", product);
          loadProducts();
      }).catch(function(error){
        $log.error(error);
      });
    };


    function loadProducts() {
      product.getListOfProducts().then(function(listProduct){
          vm.products = listProduct;
      }).catch(function(error){
        $log.error(error);
      });
    }

    function showToastr() {
      toastr.info('TOTO');
    }

  }
})();
