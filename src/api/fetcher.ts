import * as _ from "underscore";
import { IFetchApiResponse } from './client-api'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

/**
Sample implementation of IApiClient using ES6 fetch
*/
export class Fetcher {
  static baseUrl: string;
  
  /**
  Send a request to the Api via 'fetch'
  @param method The Http Method
  @param url The Request Url
  @param payload The Request Payload
  @param authToken The authorization bearer token
  */
  static sendJson<T, R>(method: string, url: string, payload?: T, authToken: string = null): Promise<IFetchApiResponse<R>> {

    let p = payload ? JSON.stringify(payload) : null;
    let init = Fetcher.requestInit(method, p, "application/json");
    if (authToken) {
      Fetcher.authorizeInit(init, authToken);
    }

    return Fetcher.fetchJson<R>(url, init);
  }

  /**
  Send a form encoded request to the Api via 'fetch'
  @param method The Http Method
  @param url The Request Url
  @param payload The Request Payload
  @param authToken The authorization bearer token
  */
  static sendForm<T, R>(method: string, url: string, payload?: T, authToken: string = null): Promise<IFetchApiResponse<R>> {
    var p = payload ? Fetcher.postFormPayload(payload) : undefined;
    var init: any = Fetcher.requestInit(method, p, "application/x-www-form-urlencoded");
    if (authToken) {
      Fetcher.authorizeInit(init, authToken)
    }

    return Fetcher.fetchJson<R>(url, init);
  }

  private static async fetchJson<R>(url: string, init: AxiosRequestConfig): Promise<IFetchApiResponse<R>> {
    try {

      const r = await axios(url, init)

      const hasContent = r.data != null

      const failed = r.status >= 400;
      let response: IFetchApiResponse<R> = { response: r };

      if (hasContent) {
        const payload = r.data
        if (failed) {
          response.failure = { json: payload }
        } else {
          response.payload = payload;
        }
        return response;
      }

      if (failed) {
        response.failure = {}
      }
      return response;
    } catch (e) {
      const err = e as AxiosError
      const msg = "Network Error: " + url;
      console.error(msg)

      return {
        response: {
          status: err.response ? err.response.status : 0,
          ok: false,
        },
        failure: {
          text: err.response ? err.response.data : msg,
        },
      }
    };
  }

  private static authorizeInit(init: AxiosRequestConfig, token: string) {
    init.headers['cookie'] = token;
    //init.headers['Authorization'] = `Bearer ${token}`;
  }

  private static postFormPayload<T>(entity: T): string {
    return _.reduce<string, string>(_.keys(entity), (m, key) => {
      var item = `${key}=${encodeURIComponent(entity[key])}`;
      if (m) {
        return `${m}&${item}`;
      }
      return item;
    }, "");
  }

  private static requestInit(method: string = "GET", payload: string = null, contentType?: string) {
    let init: AxiosRequestConfig = {
      method,
      headers: {
        'Content-Type': contentType
      },
      withCredentials: true,
    };
    if (payload) {
      init.data = payload;
    }

    return init;
  }
}
