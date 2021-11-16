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
                return "Warning";
            }
        },

        deliveryText: function (bStatus) {
            if (bStatus) {
                return "Versendet";
            } else {
                return "Nicht versendet";
            }
        },

        deliveryState: function (bStatus) {
            if (bStatus) {
                return "Success";
            } else {
                return "Warning";
            }
        },

        deliveryButton: function (bPayed, bSent) {
            if (bPayed && !bSent) {
                return true;
            } else {
                return false;
            }
        }
    }
})