sap.ui.define([], function () {
    "use strict"
    return {


        payedText: function (bStatus) {
            if (bStatus) {
                return "Bezahlt";
            } else {
                return "Offen";
            }
        },

        payedState: function (bStatus) {
            if (bStatus) {
                return "Success";
            } else {
                return "Error";
            }
        },

        deliveryText: function (sStatus) {
            if (sStatus === "") {
                return "Unbekannt";
            } else if (sStatus === "ordered") {
                return "Nicht versendet";
            } else if (sStatus === "shipped") {
                return "Versendet"
            } else {
                return "Unbekannt";
            }
        },

        deliveryState: function (sStatus) {
            if (sStatus === "") {
                return "Error";
            } else if (sStatus === "ordered") {
                return "Warning";
            } else if (sStatus === "shipped") {
                return "Success"
            } else {
                return "Error";
            }
        }
    }
})