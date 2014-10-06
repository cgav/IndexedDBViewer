(function () {
	"use strict";

	var app = angular.module("EntryService", []);

	app.service("EntryService", ["$q", function ($q) {
		return {
			getEntries: function (databaseName, storeName) {
				var dfd = $q.defer(),
					message;

				if (chrome && chrome.extension) {
					message = {
						toContentScript: true,
						type: "getEntries",
						tabId: chrome.devtools.inspectedWindow.tabId,
						databaseName: databaseName,
						storeName: storeName
					};

					chrome.extension.sendMessage(message, function (response) {
						dfd.resolve(response);
					});
				} else {
					dfd.resolve({
						entries: [{
							id: "entry1",
							name: "hallo world"
						}, {
							id: "entry2",
							name: "asdfasdf"
						}],
						idColumn: "id"
					});
				}

				return dfd.promise;
			}
		};
	}]);
})();