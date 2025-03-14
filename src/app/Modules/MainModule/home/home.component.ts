import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger("textAnimation", [
      transition('void <=>*', [
        style(
          {
            opacity: 0,
            transform: 'translateX(-100px)',
            zIndex:-10
          }
        ),
        animate(1000)])
    ])

  ]
})

export class HomeComponent {

}
