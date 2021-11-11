sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
], function (
    Controller,
    History,
    UIComponent,
    MessageBox
) {
    "use strict";

    return Controller.extend("onlineshop.adminspace.controller.CreateProduct", {
        onCreate: function (oEvent) {
            if (this._formIsNotCompletelyFilled()) {
                MessageBox.error("Alle Felder müssen ausgefüllt sein!", {
                    title: "Error"
                });
            } else {
                const oData = {
                    title: this.byId("title").getValue(),
                    description: this.byId("description").getValue(),
                    price: parseFloat(this.byId("price").getValue()),
                    imgpath: this.byId("imgpath").getValue()
                };

                $.ajax({
                    url: "http://localhost:3000/products",
                    type: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify(oData),
                    success: (sResult) => {
                        sap.m.MessageToast.show(sResult);
                        this._resetToInitValues();
                        $.get("http://localhost:3000/products", (data, status) => {
                            console.log(data);
                            this._refreshProductModel();
                        });
                    },
                    error: function (oError) {
                        sap.m.MessageToast.show("Fehler beim Erstellen des Produktes!");
                    }
                });
            }
        },

        onNavBack: function (oEvent) {
            if (this._formIsEmpty()) {
                this._navBack();
            } else {
                MessageBox.warning("Ungespeicherte Änderungen gehen verloren!", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: (sAction) => {
                        if (sAction === "OK") {
                            this._resetToInitValues();
                            this._navBack();
                        }
                    }
                });
            }
        },

        _refreshProductModel: function () {
            this.getView().getModel("products").setData(data);
            this.getView().getModel("products").refresh(true);
        },

        _resetToInitValues: function () {
            this.byId("title").setValue("");
            this.byId("price").setValue("");
            this.byId("description").setValue("");
            this.byId("imgpath").setValue("");
        },

        _navBack: function () {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1)
            } else {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("products", {}, true)
            }
        },

        _formIsEmpty: function () {
            if (this.byId("description").getValue() === "" && this.byId("imgpath").getValue() === "" && this.byId("price").getValue().toString() === "" && this.byId("title").getValue() === "") {
                return true;
            } else {
                return false;
            }
        },

        _formIsNotCompletelyFilled: function () {
            if (this.byId("description").getValue() !== "" && this.byId("imgpath").getValue() !== "" && this.byId("price").getValue().toString() !== "" && this.byId("title").getValue() !== "") {
                return false;
            } else {
                return true;
            }
        }
    });
});