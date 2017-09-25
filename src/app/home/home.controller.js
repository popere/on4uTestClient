(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(toastr, productService, $log) {


    var vm = this;

    vm.products = [];
    vm.order = {
      category : "sku",
      direction : "+"
    };
    vm.loadFailed = false;

    loadProducts();

    /**
     * Function to change the order of the product list
     * @param newCategoryOrder
     */
    vm.orderBy = function(newCategoryOrder) {
      if(vm.order.category === newCategoryOrder){
        vm.order.direction = vm.order.direction === "+" ? "-" : "+";
      } else {
        vm.order.category = newCategoryOrder;
        vm.order.direction = "+";
      }
    };

    /**
     * Function to know if the list of products is ordered by the given direction and category values
     * @param direction
     * @param category
     * @returns {boolean}
     */
    vm.isOrdered = function(direction, category) {
      return direction === vm.order.direction && category === vm.order.category;
    };

    /**
     * Function to load all products in the database
     */
    function loadProducts() {
      productService.getListOfProducts().then(function(listProduct){
        vm.products = listProduct;
        vm.loadFailed = false;
        toastr.success('Recuperación éxitosa de los productos.');
      }).catch(function(error){
        $log.error(error);
        toastr.error('Error en la recuperación de la lista de productos del servidor.');
        vm.loadFailed = true;
      });
    }

  }
})();
