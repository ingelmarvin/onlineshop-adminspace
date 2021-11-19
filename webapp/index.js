sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "onlineshop.adminspace",
		settings: {
			id: "adminspace"
		},
		async: true
	}).placeAt("content");

});