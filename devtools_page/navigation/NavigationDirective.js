(function () {
	"use strict";

	var app = angular.module("NavigationDirective", ["NavigationController"]);

	app.directive("navigation", function () {
		return {
			restrict: "E",
			templateUrl: "navigation/navigation.html",
			controller: "NavigationController"
		}
	});
})();