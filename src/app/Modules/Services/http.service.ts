import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {OrderModel} from "../Models/order.model";

@Injectable({providedIn: "root"})
export class HttpService {
  serverURl: string = environment.serverURL + 'api/';

  constructor(private httpClient: HttpClient) {
  }

  post(url: string, model: any) {
    return this.httpClient.post(this.serverURl + url, model);
  }
  postWithResponse(url: string, model: any) {
    return this.httpClient.post(this.serverURl + url, model,{observe: 'response'});
  }

  get(url: string, model?: {}) {
    return this.httpClient.get(this.serverURl + url, {params: model});
  }

  delete(url: string, id: number) {
    return this.httpClient.delete(this.serverURl + url+'/'+id);
  }


  put(url: string, model: any) {
    return this.httpClient.put(this.serverURl + url, model);

  }
}
