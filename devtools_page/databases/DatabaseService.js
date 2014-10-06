(function () {
	"use strict";

	var app = angular.module("DatabaseService", []);

	app.service("DatabaseService", ["$q", function ($q) {
		return {
			getList: function () {
				var list,
					dfd = $q.defer(),
					message;

				if (chrome && chrome.extension) {
					message = {
						toContentScript: true,
						type: "getDatabaseNames",
						tabId: chrome.devtools.inspectedWindow.tabId
					};

					chrome.extension.sendMessage(message, function (response) {
						list = response.list;
						dfd.resolve(list);
					});
				} else {
					dfd.resolve(["db1", "db2"]);
				}

				return dfd.promise;
			}
		};
	}]);
})();