import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule,
    FormsModule
  ],
  exports:[
  ]
})
export class AuthModule { }
