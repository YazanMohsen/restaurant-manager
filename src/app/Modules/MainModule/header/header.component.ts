import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {ApplicationEnum} from "../../Constants/Application.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(    private router: Router,
                  private authService: AuthService) {
  }

  authenticated: boolean;
  username: string;

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }

  ngOnInit(): void {
    this.authenticated=this.authService.getUser()!=null;
     this.authService.getAuthenticationPublisher().subscribe(
       (user)=>{
         this.authenticated = user!=null;
         this.username=user!=null?user.name:"";
       }
     );
    this.username=this.authService.getUserName();
  }

  protected readonly ApplicationEnum = ApplicationEnum;

  isClient(){
    return this.authService.isClient();
  } isGuest(){
    return this.authService.isGuest();
  }
}
