(function () {
	"use strict";

	// displaying panel in dev tools
	chrome.devtools.panels.create("IndexedDB Viewer", "", "devtools_page/panel.html#/databases", null);
})();