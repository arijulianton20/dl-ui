import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(arg) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, arg);
  }

  getItems(args) {
    let endpoint = `${serviceUri}/items`;
    return super.list(endpoint, args);
  }

  create(data) {
    // console.log("service, create(data)", data);
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    // console.log("service, update(data)", data);
    var endpoint = `${serviceUri}`;
    return super.put(endpoint, data);
  }

  // search(unitId, date) {
  //   return fetch(
  //     "http://localhost:9000/src/modules/purchasing/reports/unit-budget-cashflow/dummy.json"
  //   ).then((response) => response.json());
  // }

  // getBestCase(query) {
  //   let endpoint = `${serviceUri}/best-case`;
  //   return super.list(endpoint, query);
  // }

  // getWorstCase(query) {
  //   let endpoint = `${serviceUri}/worst-case`;
  //   return super.list(endpoint, query);
  // }

  // upsertWorstCase(form) {
  //   let endpoint = `${serviceUri}/worst-case`;
  //   return super.put(endpoint, form);
  // }

  // getOACI(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-in-operational`;
  //   return super.list(endpoint, query);
  // }

  // getOACO(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-out-operational`;
  //   return super.list(endpoint, query);
  // }

  // getOADiff(query) {
  //   let endpoint = `${serviceUri}/best-case/diff-operational`;
  //   return super.list(endpoint, query);
  // }

  // getIACI(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-in-investment`;
  //   return super.list(endpoint, query);
  // }

  // getIACO(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-out-investment`;
  //   return super.list(endpoint, query);
  // }

  // getIADiff(query) {
  //   let endpoint = `${serviceUri}/best-case/diff-investment`;
  //   return super.list(endpoint, query);
  // }

  // getFACI(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-in-financial`;
  //   return super.list(endpoint, query);
  // }

  // getFACO(query) {
  //   let endpoint = `${serviceUri}/best-case/cash-out-financial`;
  //   return super.list(endpoint, query);
  // }

  // getFADiff(query) {
  //   let endpoint = `${serviceUri}/best-case/diff-financial`;
  //   return super.list(endpoint, query);
  // }

  // getXls(query) {
  //   let endpoint = `${serviceUri}/unit/xls?unitId=${query.unitId}&date=${query.date}`;
  //   return super.getXls(endpoint);
  // }

  // getPdf(query) {
  //   let endpoint = `${serviceUri}/unit/pdf?unitId=${query.unitId}&date=${query.date}`;
  //   return super.getPdf(endpoint);
  // }
}