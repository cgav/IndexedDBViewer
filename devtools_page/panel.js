(function () {
	"use strict";

	var app = angular.module("indexeddb-viewer-app", [
		"ngRoute",
		"navigation",
		"utilities",
		"databases",
		"stores",
		"entries"
	]);

	app.config(["$routeProvider", function ($routeProvider) {
		$routeProvider
			.when("/databases", {
				templateUrl: "databases/list.html",
				controller: "DatabaseController"
			})
			.when("/stores/:databaseName", {
				templateUrl: "stores/list.html",
				controller: "StoreController"
			})
			.when("/entries/:databaseName/:storeName", {
				templateUrl: "entries/entries.html",
				controller: "EntryController"
			})
			.otherwise({
				templateUrl: "404.html"
			});
	}]);
})();