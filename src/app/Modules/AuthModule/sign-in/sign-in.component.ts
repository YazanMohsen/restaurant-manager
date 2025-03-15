import { Component } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

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
  OnSubmit(value: any){

  };

}
