(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateController',
        controllerAs: 'create'
      })
      .state('edit', {
        url: '/edit/:productId',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditController',
        controllerAs: 'edit'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
