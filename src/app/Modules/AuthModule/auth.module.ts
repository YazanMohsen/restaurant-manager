import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true}

  ],
  exports:[
  ]
})
export class AuthModule { }
