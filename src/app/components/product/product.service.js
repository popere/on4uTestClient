(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .factory('product', productService);

  /** @ngInject */
  function productService($log, $http) {
    var apiTest = 'http://localhost:8000';

    var service = {
      getListOfProducts: _getListOfProducts,
      getProduct: _getProduct,
      createProduct: _createProduct,
      deleteProduct: _deleteProduct,
      updateProduct: _updateProduct
    };

    return service;


    function _getListOfProducts() {
      return $http.get(apiTest + "/products")
                  .then(getListProductsComplete)
                  .catch(getListProductsFailed);

      function getListProductsComplete(response) {
        return response.data;
      }

      function getListProductsFailed(error) {
        $log.error('Request failed for getListProducts.\n' + angular.toJson(error.data, true));
      }
    }

    function _getProduct(index) {
      if(angular.isNumber(index)){
        return $http.get(apiTest + "/products/ + index")
                    .then(getProductComplete)
                    .catch(getProductFailed);
      } else {
        return null;
      }


      function getProductComplete(response) {
        return response.data;
      }

      function getProductFailed(error) {
        $log.error('Request failed for getProduct.\n' + angular.toJson(error.data, true));
      }
    }

    function _createProduct(product) {
      if(product && product.price && product.sku && product.name){
        return $http.post(apiTest + "/products",
                          product,
                          {headers: {'Content-Type': "application/json"}}
                    )
                    .then(postProductComplete)
                    .catch(postProductFailed);
      } else {
        return null;
      }


      function postProductComplete(response) {
        return response.data;
      }

      function postProductFailed(error) {
        $log.error('Request failed for postProduct.\n' + angular.toJson(error.data, true));
      }
    }

    function _deleteProduct(index) {
      if(angular.isNumber(index)){
        return $http.delete(apiTest + "/products/" + index)
                    .then(deleteProductComplete)
                    .catch(deleteProductFailed);
      } else {
        return null;
      }


      function deleteProductComplete(response) {
        return response.data;
      }

      function deleteProductFailed(error) {
        $log.error('Request failed for deleteProduct.\n' + angular.toJson(error.data, true));
      }
    }

    function _updateProduct(index) {
      if(angular.isNumber(index)){
        return $http.delete(apiTest + "/products/" + index)
                    .then(updateProductComplete)
                    .catch(updateProductFailed);
      } else {
        return null;
      }


      function updateProductComplete(response) {
        return response.data;
      }

      function updateProductFailed(error) {
        $log.error('Request failed for updateProduct.\n' + angular.toJson(error.data, true));
      }
    }


  }
})();
