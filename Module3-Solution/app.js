(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems);

  NarrowItDownController.$inject = ["MenuSearchService"];
  MenuSearchService.$inject = ["$http"];

  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.found = [];
    ctrl.foundOrNot = false;
    ctrl.narrowItDownIsClicked = function (input) {
      var promise = MenuSearchService.getMatchedMenuItems();
      promise.then(function (response) {
        console.log(input);
        if (input == undefined || input == "") {
          ctrl.found = [];
          ctrl.foundOrNot = true;
        } else {
          ctrl.foundOrNot = false;
          ctrl.found = response.data.menu_items.filter((eachItem) =>
            eachItem.description.toLowerCase().includes(input.toLowerCase())
          );
          if (ctrl.found.length === 0) {
            ctrl.found = [];
            ctrl.foundOrNot = true;
          }
          console.log(ctrl.found);
        }
      });
    };

    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
      if (ctrl.found.length === 0) {
        ctrl.found = [];
        ctrl.foundOrNot = true;
      }
    };
  }

  function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = function () {
      return $http({
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      });
    };
  }

  function FoundItems() {
    var ddo = {
      restrict: "E",
      templateUrl: "directive.html",
      scope: {
        foundItem: "<",
        onRemove: "&",
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "ctrl",
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var ctrl = this;
  }
})();
