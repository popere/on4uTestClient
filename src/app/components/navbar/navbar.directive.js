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

      vm.currentState;
      vm.collapsed = false;


      /**
       * Function to know if we are in state corresponding to tab
       * @param tab
       * @returns {boolean}
       */
      vm.isState = function(tab){
        vm.currentState = $state.current.name;

        var gestionActive = tab === "gestion" && (vm.currentState === "products" || vm.currentState === "create" || vm.currentState === "edit" );
        var aboutActive = tab === "about" && (vm.currentState === "about");
        var tiendaActive = tab === "tienda" && (vm.currentState === "home");
        var configActive = tab === "config" && (vm.currentState === "config");

        return gestionActive || aboutActive || tiendaActive || configActive;

      };

      /**
       * Function to have the text to show in each moment, depending on the current state.
       * @returns {*}
       */
      vm.titleXs = function(){
        return _tabsToTitle[_stateToTab[$state.current.name]];
      };

      /**
       * Function to go the home state.
       */
      vm.goHome = function(){
        tools.goToHome();
      };

    }
  }

})();
