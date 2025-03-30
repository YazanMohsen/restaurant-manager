import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {tap} from "rxjs";
import {ResponseModel} from "../Models/response.model";
import {environment} from "../../../environments/environment";


@Injectable({providedIn: "root"})
export class ImageService {
  constructor(private httpService: HttpService) {

  }

  upload(image) {
    let formData = new FormData();
    formData.append("image", image);
    return this.httpService.post('upload', formData).pipe(
      tap((response:ResponseModel<string>) => {
        response.model=environment.serverURL+response.model;
      })
    );
  }
}
