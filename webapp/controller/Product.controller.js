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
            this._saveInitValues();
        },

        _saveInitValues: function () {
            //save init values for reset
            window.title = this.byId("title").getValue();
            window.price = this.byId("price").getValue();
            window.description = this.byId("description").getValue();
            window.imgpath = this.byId("imgpath").getValue();
            window.savedSinceLastChange = false;
        },

        _resetToInitValues: function () {
            //save init values for reset
            if (!window.savedSinceLastChange) {
                this.byId("title").setValue(window.title);
                this.byId("price").setValue(window.price);
                this.byId("description").setValue(window.description);
                this.byId("imgpath").setValue(window.imgpath);

            }
        },
        onNavBack: function (oEvent) {
            this._resetToInitValues();

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
                title: this.byId("title").getValue(),
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
                    window.savedSinceLastChange = true;
                    window.title = oData.title;
                    window.price = oData.price;
                    window.description = oData.description;
                    window.imgpath = oData.imgpath;

                    sap.m.MessageToast.show(sResult);
                },
                error: function (oError) {
                    sap.m.MessageToast.show(oError.responseText);
                }
            });
        },

        onValueChanged: function (oEvent) {
            window.savedSinceLastChange = false;
        }
    });
});