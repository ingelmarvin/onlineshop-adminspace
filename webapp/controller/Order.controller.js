sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
], function (
    Controller,
    History,
    UIComponent
) {
    "use strict";

    return Controller.extend("onlineshop.adminspace.controller.Order", {
        onNavBack: function (oEvent) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("orders", {}, true)
            }
        },

        onSave: function (oEvent) {

        }
    });
});