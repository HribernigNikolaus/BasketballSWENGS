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
import { LeagueCardComponent } from '../basketball/league/league-card/league-card.component';
import { StadiumCardComponent } from '../basketball/stadium/stadium-card/stadium-card.component';
import { TeamCardComponent } from '../basketball/team/team-card/team-card.component';
import { PlayerCardComponent } from '../basketball/player/player-card/player-card.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    LeagueCardComponent,
    StadiumCardComponent,
    TeamCardComponent,
    PlayerCardComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BasketballModule,

    RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
