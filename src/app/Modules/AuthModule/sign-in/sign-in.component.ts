import {Component} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
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
export class SignInComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) {
  }

  OnSubmit(value: any) {
    this.authService.login(value).subscribe(
      () => {
        this.toastr.success("You Logged in Successfully ","Welcome  "+this.authService.getUser().name);
        if (this.authService.isClient())
          this.router.navigate(['/restaurants/all']);
        else if (this.authService.isRestaurantAdmin())
          this.router.navigate(['/admin/restaurant-manager']);
        else if (this.authService.isSystemAdmin())
          this.router.navigate(['/admin/system']);
      },
      (error)=>{
        this.toastr.error(error.message,'Failed To Login ');

      }
    );
  };

}
