import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader= require("../../../../loader/cost-calculation-garment-loader");

@inject(SalesService)
export class Item {
    @bindable selectedRO;

    constructor(salesService) {
        this.salesService=salesService;
    }

    get filter() {
        var filter={
            BuyerCode:this.data.BuyerCode,
            Section: this.data.Section,
        };
        return filter;
    }

    detailsColumns = [
        { header: "Carton 1" },
        { header: "Carton 2" },
        { header: "Colour" },
        { header: "Jml Carton" },
        { header: "Qty PCS" },
        { header: "Total Qty" },
        { header: "" },
    ];

    get roLoader() {
        return CostCalculationLoader;
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
    }

    toggle() {
        if (!this.isShowing)
          this.isShowing = true;
        else
          this.isShowing = !this.isShowing;
      }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
        if(this.data.roNo){
            this.selectedRO={
                RO_Number: this.data.RONo || this.data.roNo
            };
        }
        this.isShowing = false;
        if(this.data.details){
            if(this.data.details.length>0){
                this.isShowing = true;
            }
        }
        console.log(this.context.context.items)
    }

    selectedROChanged(newValue){
        if(newValue){
            this.salesService.getCostCalculationById(newValue.Id)
            .then(result=>{
                this.salesService.getSalesContractById(result.SCGarmentId)
                .then(sc=>{
                    this.data.roNo= result.RO_Number;
                    this.data.article=result.Article;
                    this.data.buyerBrand=result.BuyerBrand;
                    this.data.unit=result.Unit;
                    this.data.uom=result.UOM;
                    this.data.valas="USD";
                    this.data.quantity=result.Quantity;
                    this.data.scNo=sc.SalesContractNo;
                    this.data.amount=sc.Amount;
                    this.data.price=sc.Price;
                    this.data.priceRO=sc.Price;
                    this.data.comodity=result.Comodity;
                })
            });
        }
    }

    get addDetails() {
        return (event) => {
            this.data.details.push({});
        };
    }

    get removeDetails() {
        return (event) => {
            this.error = null;
     };
    }

    get totalQty(){
        let qty=0;
        if(this.data.details){
            for(var detail of this.data.details){
                if(detail.cartonQuantity && detail.quantityPCS){
                    qty+=detail.cartonQuantity*detail.quantityPCS;
                }
            }
        }
        return qty;
    }

    get totalCtn(){
        let qty=0;
        if(this.data.details){
            for(var detail of this.data.details){
                if(detail.cartonQuantity){
                    qty+=detail.cartonQuantity;
                }
            }
        }
        return qty;
    }
}