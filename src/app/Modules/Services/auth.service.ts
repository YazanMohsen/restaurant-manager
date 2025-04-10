import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Subject, tap} from "rxjs";
import {ResponseModel} from "../Models/response.model";
import {UserModel} from "../Models/user.model";
import {Roles} from "../Constants/Roles.enum";

@Injectable({providedIn: "root"})
export class AuthService {
  authenticationPublisher=new Subject<UserModel>()

  constructor(private httpService: HttpService) {

  }

  signup(user: any) {
    return this.httpService.post('auth/register', user).pipe(
      // tap(response => {
      //     let token = response.headers.get("Authorization");
      //     localStorage.setItem('Authorization', token)
      //   }
      // )
      tap((response: ResponseModel<UserModel>) => {
          this.handleAuthentication(response)
        }
      )
    );
  }

  login(user: any) {
    return this.httpService.post('auth/login', user).pipe(
      // tap(response => {
      //     let token = response.headers.get("Authorization");
      //     localStorage.setItem('Authorization', token)
      //   }
      // )
      tap((response: ResponseModel<UserModel>) => {
          this.handleAuthentication(response)
        }
      ));
  }

  private handleAuthentication(response: ResponseModel<UserModel>) {
    response.model.token = 'Bearer ' + response.model.token;
    localStorage.setItem('user', JSON.stringify(response.model))
    this.authenticationPublisher.next(response.model);
  }

  public getUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  public static getCurrentUser(): UserModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getToken() {
    return this.getUser()?.token;
  }

  public getRole() {
    return this.getUser()?.role;
  }
  public getUserName() {
    return this.getUser()?.name;
  }

  getAuthenticationPublisher() {
    return this.authenticationPublisher;
  }

  logout() {
    localStorage.removeItem('user');
    this.authenticationPublisher.next(null);

  }

  isGuest(){
    return this.getRole()==null;
  } isClient(){
    return this.getRole()==Roles.User;
  }
  isSystemAdmin() {
    return this.getRole()==Roles.System_Admin;
  }
  isRestaurantAdmin() {
    return this.getRole()==Roles.Restaurant_Admin;
  }
}
