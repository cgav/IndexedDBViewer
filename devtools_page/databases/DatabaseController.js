(function () {
	"use strict";

	var app = angular.module("DatabaseController", ["DatabaseService", "NavigationService"]);

	app.controller("DatabaseController", [
		"$scope", 
		"$location", 
		"DatabaseService", 
		"NavigationService",
		function ($scope, $location, DatabaseService, NavigationService) {
			$scope.list = [];

			DatabaseService.getList().then(function (names) {
				var i;
				for (i = 0; i < names.length; i++) {
					$scope.list.push({
						name: names[i],
						encodedUrl: encodeURIComponent(names[i])
					});
				}
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