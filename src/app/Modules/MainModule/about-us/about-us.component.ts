import { Component } from '@angular/core';
import {ApplicationEnum} from "../../Constants/Application.enum";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  protected readonly ApplicationEnum = ApplicationEnum;
}
