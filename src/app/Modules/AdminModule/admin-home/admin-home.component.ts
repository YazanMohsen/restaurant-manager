import {Component} from '@angular/core';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})

export class AdminHomeComponent {
  constructor(private authService: AuthService) {
  }

  isSystemAdmin() {
    return this.authService.isSystemAdmin();
  }

  isRestaurantAdmin() {
    return this.authService.isRestaurantAdmin();
  }
}
