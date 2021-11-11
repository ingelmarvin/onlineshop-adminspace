sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    History,
    UIComponent,
    formatter,
    Filter,
    FilterOperator
) {
    "use strict";
    return Controller.extend("onlineshop.adminspace.controller.Orders", {
        formatter: formatter,
        onInit: function () {
        },

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

        onOrderPressed: function (oEvent) {
            sap.m.MessageToast.show("Order clicked");
            //TODO
        },

        onFilterOrders: function (oEvent) {
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("_id", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("table");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});