(function() {
  'use strict';

  angular
    .module('on4uTestClient')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($state, tools) {

      var _tabsToTitle = {
        tienda: "Tienda de Pablo",
        gestion: "Gestión de productos",
        about: "Sobre Pablo",
        config: "Configuración"
      };

      var _stateToTab = {
        products: "gestion",
        create: "gestion",
        edit: "gestion",
        about: "about",
        config: "config",
        home: "tienda"
      };

      var vm = this;

      vm.currentState = $state.current.name;
      vm.collapsed = false;



      vm.isState = function(tab){
        var gestionActive = tab === "gestion" && (vm.currentState === "products" || vm.currentState === "create" || vm.currentState === "edit" );
        var aboutActive = tab === "about" && (vm.currentState === "about");
        var tiendaActive = tab === "tienda" && (vm.currentState === "home");
        var configActive = tab === "config" && (vm.currentState === "config");

        return gestionActive || aboutActive || tiendaActive || configActive;

      };

      vm.titleXs = function(){
        return _tabsToTitle[_stateToTab[$state.current.name]];
      };

      vm.goHome = function(){
        tools.goToHome();
      };

    }
  }

})();
