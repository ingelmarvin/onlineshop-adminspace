sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "../model/formatter"
], function (
    Controller,
    History,
    UIComponent,
    formatter
) {
    "use strict";
    return Controller.extend("onlineshop.adminspace.controller.Orders", {
        formatter: formatter,
        onInit: function () {
            this._oRouter = UIComponent.getRouterFor(this);
        },

        onNavBack: function (oEvent) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {

                this._oRouter.navTo("overview", {}, true)
            }
        },

        onOrderPressed: function (oEvent) {
            sap.m.MessageToast.show("Order clicked");
        },

        onFilterOrders: function (oEvent) {

        }
    });
});