import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

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

  OnSubmit(value: any) {

  }
}
