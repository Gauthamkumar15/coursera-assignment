var app = angular.module("LunchCheck", []);

app.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ["$scope"];

function LunchCheckController($scope) {
  $scope.lunchInput = "";
  $scope.checkButtonClicked = function () {
    let lunchArray = $scope.lunchInput.split(",");
    lunchArray = lunchArray.filter((eachItem) => eachItem.trim() !== ""); // Considering space is not an item

    if (lunchArray.length === 0) {
      $scope.lunchResult = "Please enter data first";
      $scope.resultColor = "red-color";
      $scope.borderColor = "border-red-color";
      return;
    }

    if (lunchArray.length > 3) {
      $scope.lunchResult = "Too much!";
      $scope.resultColor = "green-color";
      $scope.borderColor = "border-green-color";
    } else {
      $scope.lunchResult = "Enjoy!";
      $scope.resultColor = "green-color";
      $scope.borderColor = "border-green-color";
    }
  };
}
