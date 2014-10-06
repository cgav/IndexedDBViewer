(function () {
	"use strict";

	var app = angular.module("StoreController", ["StoreService", "NavigationService"]);

	app.controller("StoreController", [
		"$scope", 
		"$routeParams", 
		"$location", 
		"StoreService",
		"NavigationService",
		function ($scope, $routeParams, $location, StoreService, NavigationService) {
			$scope.list = [];
			$scope.databaseName = $routeParams.databaseName;

			StoreService.getList(decodeURIComponent($routeParams.databaseName)).then(function (names) {
				$scope.list = names;
			});

			$scope.redirectTo = function (name, url) {
				$location.path(url);
				NavigationService.push({
					name: name,
					url: url
				});
			};
		}
	]);
})();