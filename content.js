(function () {
	"use strict";

	// chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
	chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {

		var getDatabaseNames,
			getStoreNames,
			getEntries;

		getDatabaseNames = function () {
			indexedDB.webkitGetDatabaseNames().onsuccess = function(sender, args) { 
				sendResponse({ list: sender.target.result });
			};
		};

		getStoreNames = function (databaseName) {
			var request = indexedDB.open(databaseName);

			request.onsuccess = function (e) {
				var dbo = e.target.result;
				return sendResponse({ list: dbo.objectStoreNames });
			};

			request.onerror = function (e) {
				return sendResponse({ error: e });
			};
		};

		getEntries = function (databaseName, storeName) {
			var request = indexedDB.open(databaseName);

			request.onsuccess = function (e) {
				var dbo = e.target.result,
					transaction = dbo.transaction([storeName], "readonly"),
					store = transaction.objectStore(storeName),
					results = [],
					cursorRequest = store.openCursor(null, "next");

				cursorRequest.onsuccess = function (e) {
					var result = e.target.result;
					if (!!result === false) {

						// we iterated through all entries
						return sendResponse({ entries: results, idColumn: store.keyPath });
					}
					results.push(result.value);
					result.continue();
				};

				cursorRequest.onerror = function (e) {
					return sendResponse({ error: e });
				}
			};

			request.onerror = function (e) {
				return sendResponse({ error: e });
			};
		};

		if (message.type === "getDatabaseNames") {
			getDatabaseNames();
		} else if (message.type === "getStoreNames") {
			getStoreNames(message.databaseName);
		} else if (message.type === "getEntries") {
			getEntries(message.databaseName, message.storeName);
		}

		console.log(message);

		return true;
	});
})();