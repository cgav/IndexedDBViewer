(function () {
	"use strict";

	var app = angular.module("EntryController", ["EntryService", "NavigationService"]);

	app.controller("EntryController", [
		"$scope", 
		"$routeParams", 
		"EntryService",
		"NavigationService",
		function ($scope, $routeParams, EntryService, NavigationService) {
			$scope.entries = [];
			$scope.idColumn = null;
			$scope.selectedEntry = null;

			$scope.setSelectedEntry = function (entry) {
				$scope.selectedEntry = entry;
			};

			$scope.isSelectedEntry = function (entry) {
				return $scope.selectedEntry === entry;
			};

			$scope.hasSelectedEntry = function () {
				return !!$scope.selectedEntry;
			};

			EntryService.getEntries(
				decodeURIComponent($routeParams.databaseName), 
				decodeURIComponent($routeParams.storeName)
			).then(function (response) {
				var i;

				$scope.idColumn = response.idColumn;

				for (i = 0; i < response.entries.length; i++) {
					$scope.entries.push(response.entries[i]);
				}
			});
		}
	]);
})();