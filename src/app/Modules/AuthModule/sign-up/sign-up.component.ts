import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ApplicationEnum} from "../../Constants/Application.enum";

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

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService:AuthService ) {
  }
  OnSubmit(value: any){
    this.authService.signup(value).subscribe(
      ()=>{
        this.toastr.success("You Registered Successfully ","Welcome  "+this.authService.getUser().name);
        if (this.authService.isClient())
          this.router.navigate(['/restaurants/all']);
      },
      (error)=>{
        this.toastr.error(error.message,'Failed To Register');

      }
    );
  };

    protected readonly ApplicationEnum = ApplicationEnum;
}
