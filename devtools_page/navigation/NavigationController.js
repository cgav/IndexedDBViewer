(function () {
	"use strict";

	var app = angular.module("NavigationController", ["NavigationService"]);
	app.controller("NavigationController", [
		"$scope", 
		"$location",
		"NavigationService", 
		function ($scope, $location, NavigationService) {
			$scope.breadcrumbs = [];

			$scope.getBreadcrumbs = function (breadcrumbs) {
				$scope.breadcrumbs = breadcrumbs;
			};

			$scope.redirectTo = function (index, url) {
				NavigationService.pop(index);
				$location.path(url);
			};

			NavigationService.registerObserver($scope.getBreadcrumbs);
		}
	]);
})();