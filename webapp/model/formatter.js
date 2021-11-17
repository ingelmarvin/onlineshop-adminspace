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
        deliveryButtonEnabled: function (bPayed, bSent) {
            if (bPayed && !bSent) {
                return true;
            } else {
                return false;
            }
        },
        deliveryButtonHover: function (bPayed, bSent) {
            if (bPayed && !bSent) {
                return "";
            } else if (bPayed && bSent) {
                return "Bestellung wurde bereits als versendet markiert";
            } else {
                return "Bestellung muss erst als bezahlt markiert werden"
            }
        }
    }
})