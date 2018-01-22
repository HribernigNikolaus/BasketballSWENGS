import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {HomeComponent} from "./home/home.component";

import {RouterModule} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {APP_ROUTES} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BasketballModule} from "../basketball/basketball.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BasketballModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,


    RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
