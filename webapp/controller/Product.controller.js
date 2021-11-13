sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/m/MessageBox"
], function (
    Controller,
    History,
    UIComponent,
    formatter,
    MessageBox
) {
    "use strict";
    return Controller.extend("onlineshop.adminspace.controller.Product", {
        formatter: formatter,

        //TODO: bild anzeigen, bild uploaden statt pfad angeben

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
            window.title = this.byId("title").getValue();
            window.price = this.byId("price").getValue();
            window.description = this.byId("description").getValue();
            window.imgpath = this.byId("imgpath").getValue();
            window.savedSinceLastChange = true;
        },

        _resetToInitValues: function () {
            if (!window.savedSinceLastChange) {
                this.byId("title").setValue(window.title);
                this.byId("price").setValue(window.price);
                this.byId("description").setValue(window.description);
                this.byId("imgpath").setValue(window.imgpath);
            }
        },
        onNavBack: function (oEvent) {
            if (!window.savedSinceLastChange) {
                MessageBox.warning("Ungespeicherte Änderungen gehen verloren!", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: (sAction) => {
                        if (sAction === "OK") {
                            this._navBack();
                        }
                    }
                });
            } else {
                this._navBack();
            }
        },

        _navBack: function () {
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
                imgpath: this.byId("imgpath").getValue(),
                _id: this.byId("_id").getValue()
            };

            if (oData.title === "" || oData.description === "" || oData.price === "" || oData.imgpath === "") {
                MessageBox.error("Alle Felder müssen ausgefüllt sein!", {
                    title: "Error"
                });
                return;
            }


            $.ajax({
                url: "http://localhost:3000/products",
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(oData),
                success: (sResult) => {
                    window.title = oData.title;
                    window.price = oData.price;
                    window.description = oData.description;
                    window.imgpath = oData.imgpath;
                    window.savedSinceLastChange = true;

                    sap.m.MessageToast.show(sResult);
                    this._refreshProductModel();

                },
                error: (oError) => {
                    sap.m.MessageToast.show("Fehler beim Erstellen des Produktes!");
                }
            });
        },

        _refreshProductModel: function () {
            $.get("http://localhost:3000/products", (oResponseData, sStatus) => {
                this.getView().getModel("products").setData(oResponseData);
                this.getView().getModel("products").refresh(true);
            });
        },

        onValueChanged: function (oEvent) {
            window.savedSinceLastChange = false;
        },

        onDelete: function (oEvent) {
            MessageBox.error("Produkt wirklich löschen?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                title: "Achtung",
                onClose: (sAction) => {
                    if (sAction === "OK") {
                        this._deleteProduct();
                    }
                }
            });
        },

        _deleteProduct: function () {
            const oData = {
                _id: this.byId("_id").getValue()
            };
            $.ajax({
                url: "http://localhost:3000/products",
                type: "DELETE",
                data: JSON.stringify(oData),
                dataType: "text",
                contentType: 'application/json',
                success: (oResponseData) => {
                    console.log(oResponseData);
                    this._refreshProductModel();
                    //sap.ui.getCore().getEventBus().publish("channel1", "productDeletedEvent", { oResponseData });
                    MessageBox.information("Produkt wurde gelöscht", {
                        onClose: (oAction) => {
                            this._navBack();
                        }
                    });
                },
                error: (oResponseData) => {
                    sap.m.MessageToast.show(oResponseData);
                }
            });
        }
    });
});