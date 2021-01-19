import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import moment from "moment";
let DivisionLoader = require("../../../../loader/division-loader");

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
    this.division = "";
    this.date = null;
    this.columns = [];
    this.rows = [];
    this.isEmpty = true;
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  async search() {
    if (this.division === "" || this.date === null) {
      this.error.division = "Divisi harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.division = "";
      this.error.date = "";

      let divisionId = 0;
      if (this.division && this.division.Id) {
        divisionId = this.division.Id;
        // this.data.DivisionId = this.division.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
      // this.data.DueDate = date;

      let arg = {
        divisionId,
        date,
      };

      await this.service.search(arg).then((result) => {
        this.columns = result.data.Headers;
        this.rows = result.data.Items;
      });

      this.isEmpty = this.rows.length !== 0 ? false : true;

      console.log("this.isEmpty", this.isEmpty);
      console.log("this.columns", this.columns);
      console.log("this.rows", this.rows);
    }
  }

  reset() {
    this.division = "";
    this.date = null;
  }

  // printXls() {
  //   if (this.division === "" || this.dueDate === null) {
  //     this.error.division = "Divisi harus diisi";
  //     this.error.dueDate = "Periode harus diisi";
  //   } else {
  //     this.error.division = "";
  //     this.error.dueDate = "";

  //     let divisionId = 0;
  //     if (this.division && this.division.Id) {
  //       divisionId = this.division.Id;
  //     }

  //     let dueDate = this.dueDate
  //       ? moment(this.dueDate).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getXls({ divisionId, dueDate });
  //   }
  // }

  // printPdf() {
  //   if (this.division === "" || this.dueDate === null) {
  //     this.error.division = "Divisi harus diisi";
  //     this.error.dueDate = "Periode harus diisi";
  //   } else {
  //     this.error.division = "";
  //     this.error.dueDate = "";

  //     let divisionId = 0;
  //     if (this.division && this.division.Id) {
  //       divisionId = this.division.Id;
  //     }

  //     let dueDate = this.dueDate
  //       ? moment(this.dueDate).format("YYYY-MM-DD")
  //       : moment(new Date()).format("YYYY-MM-DD");

  //     this.service.getPdf({ divisionId, dueDate });
  //   }
  // }

  bind() {
    this.data = {};
  }

  get divisionLoader() {
    return DivisionLoader;
  }
}