(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .factory('productService', productService);

  /** @ngInject */
  function productService($log, $http, ipApiByDefault) {
    var apiTest = ipApiByDefault;

    var service = {
      getListOfProducts: _getListOfProducts,
      getProduct: _getProduct,
      createProduct: _createProduct,
      deleteProduct: _deleteProduct,
      updateProduct: _updateProduct,
      modifyUrlApi: _modifyUrlApi,
      getCurrentUrlApi: _getCurrentUrlApi,
      resetUrlApi: _resetUrlApi

    };

    return service;

    /**
     * Function to modify the url of the api
     * @param newUrlApi
     * @returns {boolean}
     * @private
     */
    function _modifyUrlApi(newUrlApi) {
      if(newUrlApi){
        apiTest = newUrlApi;
        return true;
      } else {
        return false;
      }
    }

    /**
     * Function to reset the url of the api to the default one.
     * @private
     */
    function _resetUrlApi() {
        apiTest = ipApiByDefault;
    }

    /**
     * Fucntion to get the current url of the api
     * @returns {string}
     * @private
     */
    function _getCurrentUrlApi() {
      return apiTest;
    }

    /**
     * Function to recuperate the list of products
     * @returns {*}
     * @private
     */
    function _getListOfProducts() {
      return $http.get(apiTest + "/products")
                  .then(getListProductsComplete)
                  .catch(getListProductsFailed);

      /**
       * Function to manage the correct case of getting all product in the DB
       * @param response
       * @returns {*}
       */
      function getListProductsComplete(response) {
        return angular.isUndefined(response.data) ? [] : response.data;
      }

      /**
       * Function to manage the error case of getting all products in the DB
       * @param error
       */
      function getListProductsFailed(error) {
        $log.error('Request failed for getListProducts.\n' + angular.toJson(error.data, true));
      }
    }

    /**
     * Function to get a product giving an index
     * @param index
     * @returns {*}
     * @private
     */
    function _getProduct(index) {
      if(angular.isNumber(index)){
        return $http.get(apiTest + "/products/" + index)
                    .then(getProductComplete)
                    .catch(getProductFailed);
      } else {
        return null;
      }

      /**
       * Function to manage the success case of a getting a product
       * @param response
       * @returns {*}
       */
      function getProductComplete(response) {
        return response.data;
      }

      /**
       * Function to manage the error case of a getting a product
       * @param error
       */
      function getProductFailed(error) {
        $log.error('Request failed for getProduct.\n' + angular.toJson(error.data, true));
      }
    }

    /**
     * Function to create a new product
     * @param product
     * @returns {*}
     * @private
     */
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

      /**
       * Function to manage the success case of a creation of a product
       * @param response
       * @returns {*}
       */
      function postProductComplete(response) {
        return response.data;
      }

      /**
       * Function to manage the error case of a creation of a product
       * @param error
       */
      function postProductFailed(error) {
        $log.error('Request failed for postProduct.\n' + angular.toJson(error.data, true));
      }
    }

    /**
     * Function to delete a product giving his index
     * @param index
     * @returns {*}
     * @private
     */
    function _deleteProduct(index) {
      if(angular.isNumber(index)){
        return $http.delete(apiTest + "/products/" + index)
                    .then(deleteProductComplete)
                    .catch(deleteProductFailed);
      } else {
        return null;
      }

      /**
       * Function to manage the response in success of a product delete
       * @param response
       * @returns {*}
       */
      function deleteProductComplete(response) {
        return response.data;
      }

      /**
       * Function to manage the error case of a delete of a product
       * @param error
       */
      function deleteProductFailed(error) {
        $log.error('Request failed for deleteProduct.\n' + angular.toJson(error.data, true));
      }
    }

    /**
     * Function to update a product giving his index.
     * @param index
     * @param product
     * @returns {*}
     * @private
     */
    function _updateProduct(index, product) {
      if(angular.isNumber(index) && product && product.price && product.sku && product.name){
        return $http.delete(apiTest + "/products/" + index,
                          product,
                          {headers: {'Content-Type': "application/json"}}
                    )
                    .then(updateProductComplete)
                    .catch(updateProductFailed);
      } else {
        return null;
      }

      /**
       * Function to manage the success case of updating a product
       * @param response
       * @returns {*}
       */
      function updateProductComplete(response) {
        return response.data;
      }

      /**
       * Function to manage the error case of updating a product
       * @param error
       */
      function updateProductFailed(error) {
        $log.error('Request failed for updateProduct.\n' + angular.toJson(error.data, true));
      }
    }


  }
})();
