(function () {
	"use strict"

	// receive message from content script and relay to the devTools page for the current tab
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

		if (message.toContentScript) {

			// sending message to content script
			chrome.tabs.sendMessage(message.tabId, message, function (response) {

				// sending response back to devtools
				sendResponse(response);
			});
		}

		return true;
	});
})();