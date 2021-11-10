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
    return Controller.extend("onlineshop.adminspace.controller.Product", {
        formatter: formatter,

        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("product").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").productPath),
                model: "products"
            })
        },
        onNavBack: function (oEvent) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("products", {}, true)
            }
        },

        onSave: function (oEvent) {
            const oData = {
                title: this.byId("name").getValue(),
                description: this.byId("description").getValue(),
                price: this.byId("price").getValue(),
                imgpath: this.byId("imgpath").getValue()
                // _id
                // gucken ob felder leer sind -> error massage + return
            };


            $.ajax({
                url: "http://localhost:3000/products",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(oData),
                success: function (sResult) {
                    sap.m.MessageToast.show(sResult);
                }
            });
        }
    });
});