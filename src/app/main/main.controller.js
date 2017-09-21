(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, product, $log, $state) {


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
      getWebDevTec();

      loadProducts();

      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    vm.orderBy = function(newCategoryOrder) {
      if(vm.order.category === newCategoryOrder){
        vm.order.direction = vm.order.direction === "+" ? "-" : "+";
      } else {
        vm.order.category = newCategoryOrder;
        vm.order.direction = "+";
      }
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
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
