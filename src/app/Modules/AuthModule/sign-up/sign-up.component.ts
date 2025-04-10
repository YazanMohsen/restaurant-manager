import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  animations: [
    trigger("fadeIn", [
      transition('void <=>*', [
        style(
          {
            opacity: 0,
          }
        ),
        animate(1000)])
    ])

  ]

})
export class SignUpComponent {

  constructor(private authService:AuthService ) {
  }
  OnSubmit(value: any){
    this.authService.signup(value).subscribe();
  };

}
