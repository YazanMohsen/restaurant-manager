import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {OrderModel} from "../Models/order.model";

@Injectable({providedIn: "root"})
export class HttpService {
  serverURl: string = environment.serverURL;

  constructor(private httpClient: HttpClient) {
  }

  post(url: string, model: any) {
    return this.httpClient.post(this.serverURl + url, model);
  }
  get(url: string) {
    return this.httpClient.get(this.serverURl + url);
  }
  delete(url: string,id:number) {
    return this.httpClient.delete(this.serverURl + url,{params:{"id":id}});
  }


  put(url: string, model:any) {
    return this.httpClient.put(this.serverURl + url, model);

  }
}
