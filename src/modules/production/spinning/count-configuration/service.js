import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'count-configurations';
const lotYarnServiceUri = "LotYarn"

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}/create`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getLot(yarnId) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("spinning");
        var _serviceUri = `lot/configuration/getLotByYarn/${yarnId}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getYarn(yarnType) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/yarns/by-type?type=${yarnType}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

}