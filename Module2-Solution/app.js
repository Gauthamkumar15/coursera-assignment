(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.buyItems = ShoppingListCheckOffService.displayToBuy();
    toBuy.removeItemFromToBuy = function (index) {
      ShoppingListCheckOffService.removeItemBuy(index);
    };
  }

  AlreadyBoughtController.$inject["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.boughtItems =
      ShoppingListCheckOffService.displayAlreadyBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    let toBuyArray = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 5 },
      { name: "apple", quantity: 3 },
      { name: "orange", quantity: 7 },
      { name: "pepsi", quantity: 2 },
    ];
    let alreadyBoughtArray = [];

    service.displayToBuy = function () {
      return toBuyArray;
    };

    service.displayAlreadyBought = function () {
      return alreadyBoughtArray;
    };

    service.removeItemBuy = function (index) {
      alreadyBoughtArray.push(toBuyArray[index]);
      toBuyArray.splice(index, 1);
    };
  }
})();
