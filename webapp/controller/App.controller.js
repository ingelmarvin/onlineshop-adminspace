sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict"
    return Controller.extend("onlineshop.adminspace.controller.App", {
        onInit: function () {
            this.themeInit();
        },

        themeInit: function () {
            const sTheme = "sap_fiori_3_dark";
            sap.ui.getCore().applyTheme(sTheme);
            localStorage.setItem("theme", sTheme)
        },

        _refreshProductModel: function () {
            this.getView().getModel("products").setData(data);
            this.getView().getModel("products").refresh(true);
        },

    });
});