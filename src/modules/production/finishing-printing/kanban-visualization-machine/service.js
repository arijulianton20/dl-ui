import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Config } from "aurelia-api";

const serviceUri = 'production/kanbans';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/read/visualization`;
        return super.list(endpoint, info);
    }
}