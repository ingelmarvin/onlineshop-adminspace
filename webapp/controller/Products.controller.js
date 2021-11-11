sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    History,
    UIComponent,
    formatter,
    MessageBox,
    Filter,
    FilterOperator
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
            var oItem = oEvent.getSource()
            // get properties of specific item: oItem.getBindingContext("products").getObject()
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("product", {
                productPath: window.encodeURIComponent(oItem.getBindingContext("products").getPath().substr(1))
            });
        },

        onCreateProduct: function (oEvent) {
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("createProduct", {}, true)
        },

        onFilterProducts: function (oEvent) {
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("table");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});