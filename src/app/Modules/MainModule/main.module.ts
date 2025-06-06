import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainRouterModule} from "./main-router.module";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FAQsComponent } from './faqs/faqs.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    FAQsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainRouterModule,
    ToastrModule.forRoot(
      {  positionClass: 'toast-bottom-left',}
    )

  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ]
})
export class MainModule { }
