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
    function NavbarController(moment, $state, $rootScope, $log) {
      var vm = this;

      vm.currentState = $state.current.name;
      vm.collapse = true;



      vm.isState = function(tab){
        var gestionActive = tab === "gestion" && (vm.currentState === "products" || vm.currentState === "create" || vm.currentState === "edit" );
        var aboutActive = tab === "about" && (vm.currentState === "about");
        var tiendaActive = tab === "tienda" && (vm.currentState === "home");
        var configActive = tab === "config" && (vm.currentState === "config");
        if( gestionActive || aboutActive || tiendaActive || configActive){
            return "active";
        } else {
          return "";
        }

      }

    }
  }

})();
