import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
  context = ["Rincian"];
  columns = [
    { field: "DocumentNo", title: "No. VB" },
    {
      field: "Date", title: "Tanggal", formatter: function (value, data, index) {
        return moment.utc(value).local().format('DD MMM YYYY');
      }
    },
    { field: "SuppliantUnitName", title: "Unit Pemohon" },
    { field: "CreatedBy", title: "Dibuat Oleh" },
    {
      field: "IsPosted", title: "Status Post", formatter: function (value, data, index) {
        return value ? 'Sudah' : 'Belum';
      }
    },
    {
      field: "IsApproved", title: "Status Approved", formatter: function (value, data, index) {
        return value ? 'Sudah' : 'Belum';
      }
    },
    {
      field: "IsCompleted", title: "Status Complete", formatter: function (value, data, index) {
        return value ? 'Sudah' : 'Belum';
      }
    }
  ];

  loader = (info) => {
    let order = {};

    if (info.sort)
      order[info.sort] = info.order;
    else
      order["Date"] = "desc";

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    // return this.service.search(arg)
    //   .then(result => {
    //     return {
    //       total: result.info.total,
    //       data: result.data
    //     }
    //   });
    return {
      total: 0,
      data: []
    }
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextCallback(event) {
    let arg = event.detail;
    let data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  post() {
    this.router.navigateToRoute('post');
  }
}