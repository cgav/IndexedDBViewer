(function () {
	"use strict";

	var app = angular.module("LoggerService", []);

	app.service("LoggerService", [function () {
		return {
			log: function (text) {
				if(chrome && chrome.runtime) {
					chrome.runtime.sendMessage({type: "bglog", obj: text});
				}
			}
		};
	}]);
})();