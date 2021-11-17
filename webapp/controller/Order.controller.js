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

    return Controller.extend("onlineshop.adminspace.controller.Order", {
        formatter: formatter,
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

        onPayed: function (oEvent) {
            const oData = this._getModelBindingData();
            oData.payed = true;

            this._updateOrderState(oData);
        },

        onSent: function (oEvent) {
            const oData = this._getModelBindingData();
            oData.sent = true;

            this._updateOrderState(oData);
        },

        _updateOrderState: function (oData) {
            $.ajax({
                url: "http://localhost:3000/orders",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(oData),
                success: (sResult) => {
                    sap.m.MessageToast.show(sResult);
                    this._refreshOrderModel();
                },
                error: (oError) => {
                    sap.m.MessageToast.show("Fehler beim Speichern der Bestellung!");
                }
            });
        },

        _getModelBindingData: function () {
            const sPath = this.getView().getElementBinding('orders').sPath;
            return this.getView().getModel('orders').getProperty(sPath);
        },

        _refreshOrderModel: function () {
            $.get("http://localhost:3000/orders", (oResponseData, sStatus) => {
                this.getView().getModel("orders").setData(oResponseData);
                this.getView().getModel("orders").refresh(true);
            });
        }
    });
});