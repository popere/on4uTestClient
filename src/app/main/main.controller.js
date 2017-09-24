(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, productService, $log, $state) {


    var vm = this;

    vm.products = [];
    vm.order = {
      category : "sku",
      direction : "+"
    };


    loadProducts();

    /**
     * Function to order the list of products by given category
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
     * Function to know if the list of product is ordered by the given direction and category values
     * @param direction
     * @param category
     * @returns {boolean}
     */
    vm.isOrdered = function(direction, category) {
      return direction === vm.order.direction && category === vm.order.category;
    };

    /**
     * Function to create a new product
     */
    vm.createProduct = function() {
      $state.go("create");
    };

    /**
     * Function to go to the modification page of a product
     * @param product
     */
    vm.modify = function(product) {
      $state.go("edit", {"productId": product.id});
    };

    /**
     * Function to delete a existing product
     * @param productToDelete
     */
    vm.delete = function(productToDelete) {
      productService.deleteProduct(productToDelete.id).then(function(){
        $log.info("Delete of product has been done, product deleted");
        loadProducts();
        toastr.success('Producto (SKU: ' + productToDelete.sku +  ') eliminado correctamente de la lista');
      }).catch(function(error){
        $log.error(error);
        toastr.success('Error durante la eliminación del producto (SKU: ' + productToDelete.sku +  ')');
      });
    };


    /**
     * Function to load all products existing in the DB
     */
    function loadProducts() {
      productService.getListOfProducts().then(function(listProduct){
          vm.products = listProduct;
        toastr.success('Recuperación exitosa de los productos.');
      }).catch(function(error){
        $log.error(error);
        toastr.error('Error en la recuperación de la lista de productos del servidor.');
      });
    }

  }
})();
