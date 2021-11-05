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
    return Controller.extend("onlineshop.adminspace.controller.Products", {
        formatter: formatter,
        onNavBack: function (oEvent) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("overview", {}, true)
            }
        },

        onProductPressed: function (oEvent) {
            sap.m.MessageToast.show("Product clicked!");
        }
    });
});