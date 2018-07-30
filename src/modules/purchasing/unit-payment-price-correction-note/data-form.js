import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
var moment = require('moment');

var SupplierLoader = require('../../../loader/supplier-loader');
var UPOLoader = require('../../../loader/unit-payment-order-loader');


@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable selectedSupplier;
    @bindable selectectedUnitPaymentOrder;

    correctionTypes = ["Harga Satuan", "Harga Total"];
    correctionType = "Harga Satuan";
    pricePerUnitCorrectionReadOnly = false;

    constructor(bindingEngine, element, service) {
        this.bindingEngine = bindingEngine;
        this.element = element; 
        this.service = service;

        this.controlOptions = {
            label: {
                    length: 4,
                    align: "right"
                },
                control: {
                    length: 5
                }
        }
    
        this.UpoItem = {
            columns:  [
                { header: "No. PO Eksternal" },
                { header: "No. PR" },
                { header: "Barang" },
                { header: "Jumlah" },
                { header: "Satuan" },
                { header: "Harga Satuan" },
                { header: "Harga Total" }
            ],
            onRemove: function() {
                this.bind();
            }
        };
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    bind() {
        if (this.data) {
            this.flag = true;
            if (this.data.correctionType == "Harga Satuan")
                this.pricePerUnitCorrectionReadOnly = false;
            else if (this.data.correctionType == "Harga Total")
                this.pricePerUnitCorrectionReadOnly = true;

            if(this.data.supplier){
                this.selectedSupplier=this.data.supplier.code+" - "+this.data.supplier.name;
            }
            this.selectectedUnitPaymentOrder=this.data.uPONo;
        }
        else
            this.flag = false;
        this.data.invoiceCorrectionDate=moment(this.data.invoiceCorrectionDate).format("DD MMM YYYY")=="01 Jan 0001"?null:this.data.invoiceCorrectionDate;
        this.data.vatTaxCorrectionDate=moment(this.data.vatTaxCorrectionDate).format("DD MMM YYYY")=="01 Jan 0001"?null:this.data.vatTaxCorrectionDate;
        this.data.incomeTaxCorrectionDate=moment(this.data.incomeTaxCorrectionDate).format("DD MMM YYYY")=="01 Jan 0001"?null:this.data.incomeTaxCorrectionDate;
        if(!this.readOnly) {
            this.UpoItem.columns.push({ header: "" });
            
        }
    }

    setItems(_paymentOrder) {
        console.log("aa")
        if(!this.readOnly){
            var _items = []
            for (var unitPaymentOrder of _paymentOrder.items) {

                for (var unitReceiptNoteItem of unitPaymentOrder.unitReceiptNote.items) {

                    var unitPaymentPriceCorrectionNoteItem = {};
                    unitPaymentPriceCorrectionNoteItem.uPODetailId=unitReceiptNoteItem._id;
                    unitPaymentPriceCorrectionNoteItem.uRNNo=unitPaymentOrder.unitReceiptNote.no;
                    unitPaymentPriceCorrectionNoteItem.ePONo=unitReceiptNoteItem.EPONo;
                    unitPaymentPriceCorrectionNoteItem.pRNo=unitReceiptNoteItem.PRNo;
                    unitPaymentPriceCorrectionNoteItem.pRId=unitReceiptNoteItem.PRId;
                    unitPaymentPriceCorrectionNoteItem.pRDetailId=unitReceiptNoteItem.PRDetailId;
                    unitPaymentPriceCorrectionNoteItem.product=unitReceiptNoteItem.product;
                    unitPaymentPriceCorrectionNoteItem.quantity=unitReceiptNoteItem.deliveredQuantity;
                    unitPaymentPriceCorrectionNoteItem.uom=unitReceiptNoteItem.deliveredUom;
                    unitPaymentPriceCorrectionNoteItem.pricePerDealUnitAfter=unitReceiptNoteItem.PricePerDealUnitCorrection;
                    unitPaymentPriceCorrectionNoteItem.priceTotalAfter=unitReceiptNoteItem.PriceTotalCorrection;
                    unitPaymentPriceCorrectionNoteItem.pricePerDealUnitBefore=unitReceiptNoteItem.PricePerDealUnitCorrection;
                    unitPaymentPriceCorrectionNoteItem.priceTotalBefore=unitReceiptNoteItem.PriceTotalCorrection;
                    unitPaymentPriceCorrectionNoteItem.currency=_paymentOrder.currency;
                    //FROM MONGO
                    // unitPaymentPriceCorrectionNoteItem.purchaseOrder = unitReceiptNoteItem.purchaseOrder;
                    // unitPaymentPriceCorrectionNoteItem.purchaseOrderId = unitReceiptNoteItem.purchaseOrderId;
                    // unitPaymentPriceCorrectionNoteItem.product = unitReceiptNoteItem.product;
                    // unitPaymentPriceCorrectionNoteItem.productId = unitReceiptNoteItem.product._id;
                    // unitPaymentPriceCorrectionNoteItem.uom = unitReceiptNoteItem.deliveredUom;
                    // unitPaymentPriceCorrectionNoteItem.uomId = unitReceiptNoteItem.deliveredUom._id;
                    // unitPaymentPriceCorrectionNoteItem.currency = unitReceiptNoteItem.currency;
                    // unitPaymentPriceCorrectionNoteItem.currencyRate = unitReceiptNoteItem.currencyRate;
                    // unitPaymentPriceCorrectionNoteItem.unitReceiptNoteNo = unitPaymentOrder.unitReceiptNote.no;

                    // if (unitReceiptNoteItem.correction) {
                    //     if (unitReceiptNoteItem.correction.length > 0) {
                    //         // var _qty = 0;
                    //         // var _hasQtyCorrection = false;
                    //         // for (var correction of unitReceiptNoteItem.correction) {
                    //         //     if (correction.correctionRemark === "Koreksi Jumlah") {
                    //         //         _qty += correction.correctionQuantity;
                    //         //         _hasQtyCorrection = true;
                    //         //     }
                    //         // }
                    //         // if (!_hasQtyCorrection) {
                    //         //     unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionQuantity;
                    //         //     unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                    //         //     unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;
                    //         // } else {
                    //         //     unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity - _qty;
                    //         //     unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                    //         //     unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit * unitPaymentPriceCorrectionNoteItem.quantity;
                    //         // }
                    //         var _qty = unitReceiptNoteItem.correction
                    //             .map((correction) => {
                    //                 if (correction.correctionRemark === "Koreksi Jumlah") {
                    //                     return correction.correctionQuantity;
                    //                 }
                    //                 else {
                    //                     return 0;
                    //                 }
                    //             })
                    //             .reduce((prev, curr, index) => {
                    //                 return prev + curr;
                    //             }, 0);

                    //         unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity - _qty;
                    //         unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPricePerUnit;
                    //         unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.correction[unitReceiptNoteItem.correction.length - 1].correctionPriceTotal;
                    //     } else {
                    //         unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                    //         unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                    //         unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                    //     }
                    // } else {
                    //     unitPaymentPriceCorrectionNoteItem.quantity = unitReceiptNoteItem.deliveredQuantity;
                    //     unitPaymentPriceCorrectionNoteItem.pricePerUnit = unitReceiptNoteItem.pricePerDealUnit;
                    //     unitPaymentPriceCorrectionNoteItem.priceTotal = unitReceiptNoteItem.pricePerDealUnit * unitReceiptNoteItem.deliveredQuantity;
                    // }

                    _items.push(unitPaymentPriceCorrectionNoteItem);
                }
            }
        
            this.data.items = _items;
            this.resetErrorItems();
        }
    }

    selectectedUnitPaymentOrderChanged(newValue) {
        if(!this.readOnly){
            var _selectedPaymentOrder = newValue;
            console.log(_selectedPaymentOrder);
            if (_selectedPaymentOrder && !this.readOnly) {
                this.data.unitPaymentOrder=_selectedPaymentOrder;
                if (!this.readOnly)
                    this.data.items = [];
                this.data.uPOId = _selectedPaymentOrder._id;
                this.data.uPONo=_selectedPaymentOrder.no;
                this.data.supplier=_selectedPaymentOrder.supplier;
                this.data.division=_selectedPaymentOrder.division;
                this.data.category=_selectedPaymentOrder.category;
                this.selectedSupplier=this.data.supplier.code +" - "+this.data.supplier.name;
                this.data.useVat=_selectedPaymentOrder.useVat;
                this.data.useIncomeTax=_selectedPaymentOrder.useIncomeTax;
                this.setItems(_selectedPaymentOrder);
            }
            else {
                this.data.items = [];
                this.data.supplier=null;
            }
        }
    }

    correctionTypeChanged(e) {
        
            console.log(e)
        if (e.srcElement) {
            if (e.srcElement.value) {
                this.data.correctionType = e.srcElement.value;
                if (this.data.correctionType == "Harga Satuan")
                    this.pricePerUnitCorrectionReadOnly = false;
                else if (this.data.correctionType == "Harga Total")
                    this.pricePerUnitCorrectionReadOnly = true;
                if (this.data.uPOId && this.data.unitPaymentOrder) {
                    if (this.data.unitPaymentOrder.items)
                        this.setItems(this.data.unitPaymentOrder);
                }
            }
        }
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

    get upoLoader(){
        return UPOLoader;
    }

    supplierView = (supplier) => {
        return `${supplier.code} - ${supplier.name}`
    }

    get supplierLoader() {
        return SupplierLoader;
    }
} 