import { ApiFactory, IFetchApiResponse, IApiClient } from './client-api'
import { Fetcher } from './fetcher'
import { config } from '../config/config'
import * as _ from "underscore";

export type DataStatus = "loading" | "loaded" | "error"

export interface IData<T> {
  status?: DataStatus
  data?: T
  error?: any
}
class ApiClient implements IApiClient {
  constructor(private getUrl: (path: string) => Promise<string>) {
  }

  async request<T, R>(method: string, authorization: boolean, path: string, payload?: T): Promise<IFetchApiResponse<R>> {
    const url = await this.getUrl(path)
    return Fetcher.sendJson<T, R>(method, url, payload, null);
  }
}

export const apiFactory = new ApiFactory(new ApiClient(path => config.appUrl(path)));
_.keys(apiFactory).forEach(f => {
  var fd = apiFactory[f];
  fd.buildParam = (pn: string, value) => {
    if (_.isArray(value)) {
      return _.map(value, v => `${pn}=${encodeURIComponent(v)}`).join("&")
    }
    return `${pn}=${encodeURIComponent(value)}`
  }
})
