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
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("order").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").orderPath),
                model: "orders"
            });

            this._setModelOnTable();
        },
        _setModelOnTable: function () {
            const oData = {
                "products": this.getView().getBindingContext("orders").getObject().products
            };
            const oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "orderproducts");
        },
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