(function () {
	"use strict";

	var app = angular.module("NavigationService", []);

	app.service("NavigationService", [function () {
		var me = this;

		me.observers = [];
		me.breadcrumbs = [];

		me.notify = function () {
			me.observers.forEach(function (cb) {
				if (typeof cb === "function") {
					cb(me.breadcrumbs);
				}
			});
		};

		return {
			push: function (breadcrumb) {
				me.breadcrumbs.push(breadcrumb);
				me.notify();
			},
			pop: function (index) {
				var i;

				if (index) {
					for (i = me.breadcrumbs.length; i > index + 1; i--) {
						me.breadcrumbs.pop();
					}
				} else {
					me.breadcrumbs.pop();
				}
				me.notify();
			},
			registerObserver: function (cb) {
				me.observers.push(cb);
			}
		};
	}]);
})();