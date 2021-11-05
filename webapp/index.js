sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "onlineshop.adminspace",
		settings : {
			id: "walkthrough"
		},
		async: true
	}).placeAt("content");

});