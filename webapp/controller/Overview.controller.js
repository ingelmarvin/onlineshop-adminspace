sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (
    Controller
) {
    "use strict";

    return Controller.extend("onlineshop.adminspace.controller.Overview", {

        onInit: function () {

        },
        onOrdersPressed: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("orders");
        },

        onProductsPressed: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("products");
        },

        onNavigate: function (oEvent) {

        }
    });
});