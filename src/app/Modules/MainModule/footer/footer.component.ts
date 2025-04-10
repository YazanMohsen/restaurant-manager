import {Component} from '@angular/core';
import {ApplicationEnum} from "../../Constants/Application.enum";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private authService:AuthService) {
  }
  protected readonly ApplicationEnum = ApplicationEnum;

  isClient(){
    return this.authService.isClient();
  }
  isGuest(){
    return this.authService.isGuest();
  }
}
