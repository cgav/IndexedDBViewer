(function () {
	"use strict";

	var app = angular.module("DebugFilter", []);

	app.filter("debug", [function () {
		return function (input) {
			if (typeof input === "undefined") {
				return "undefined";
			} else {
				return JSON.stringify(input, null, 4);
			}
		};
	}]);
})();