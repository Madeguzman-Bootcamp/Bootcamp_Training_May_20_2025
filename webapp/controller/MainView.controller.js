sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
function (Controller, MessageToast, JSONModel) {
    "use strict";
    return Controller.extend("githubintegration.controller.MainView", {
        onInit: function () {
            var oModeOfPayment = {
                "TypeOfPayment": [
                    {
                        "NameType": "GCash",
                        "TypeAbre": "GCASH"
                    },
                    {
                        "NameType": "Cash on Delivery",
                        "TypeAbre": "COD"
                    },
                    {
                        "NameType": "Credit Card",
                        "TypeAbre": "CC"
                    }
                ],
                "Editable": true,
                "Enabled": true
            };

            var oModelModeofPayment = new JSONModel(oModeOfPayment);
            this.getView().setModel(oModelModeofPayment);

        },
        onAddItem: function (){
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
        },
        fnDisplayMsg: function (sMsg){
            MessageToast.show(sMsg);
        },
        onChangeMOP: function (oEvent) {

            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var aInputIdsmob= ["idLblPhone", "idInputPhone"];
            var aInputIds = ["idLblCreditCard", "idInputCreditCard","idInputCreditCCV","idInputCreditExpiryDate"];
            var aInputIdsAll = ["idLblPhone", "idInputPhone", "idLblCreditCard", "idInputCreditCard","idInputCreditCCV","idInputCreditExpiryDate"];
            
            if (sSelectedKey === "GCASH"){
                // show the mobile field
                    aInputIdsmob.forEach(function(sInputIdmob) {
                        var oInputmob = this.getView().byId(sInputIdmob);
                        oInputmob.setVisible(true); 
                    }.bind(this));
                    aInputIds.forEach(function(sInputId) {
                        var oInput = this.getView().byId(sInputId);
                        oInput.setVisible(false); 
                    }.bind(this));
                    MessageToast.show("GCash");
            } else if (sSelectedKey === "CC"){
                // show the cc field
                aInputIds.forEach(function(sInputId) {
                    var oInput = this.getView().byId(sInputId);
                    oInput.setVisible(true); 
                }.bind(this));
                aInputIdsmob.forEach(function(sInputIdmob) {
                    var oInputmob = this.getView().byId(sInputIdmob);
                    oInputmob.setVisible(false); 
                }.bind(this));
                MessageToast.show("Credit Card");
            } else {
                    aInputIdsAll.forEach(function(sInputId) {
                        var oInput = this.getView().byId(sInputId);
                        oInput.setVisible(false); 
                    }.bind(this));
                    MessageToast.show("Cash on Delivery");
            }
        },
        onPressCheckout: function (){
            var aInputIds = ["idInptFName","idInptLName"];
            aInputIds.forEach(function(sInputId) {
                var oInput = this.getView().byId(sInputId).getValue();
                if (oInput === ""){
                    MessageToast.show("Required Field is blank"); 
                }
            }.bind(this));
        }
    });
});