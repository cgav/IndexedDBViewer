(function () {
	"use strict";

	var app = angular.module("StoreService", []);

	app.service("StoreService", ["$q", function ($q) {
		return {
			getList: function (databaseName) {
				var list,
					dfd = $q.defer(),
					message;

				if (chrome && chrome.extension) {
					message = {
						toContentScript: true,
						type: "getStoreNames",
						tabId: chrome.devtools.inspectedWindow.tabId,
						databaseName: databaseName
					};

					chrome.extension.sendMessage(message, function (response) {
						list = response.list;
						dfd.resolve(list);
					});
				} else {
					dfd.resolve(["store1", "store2"]);
				}

				return dfd.promise;
			}
		};
	}]);
})();