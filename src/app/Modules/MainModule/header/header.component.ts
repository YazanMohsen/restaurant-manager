import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authenticated: boolean=true;

  onSignOut() {
    this.authenticated=false
  }
  onSignIn() {
    this.authenticated=true
  }
}
