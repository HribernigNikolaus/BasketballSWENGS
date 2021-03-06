import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BASKETBALL_ROUTES} from "./basketball.routes";
import {LeagueComponent} from "./league/league.component";
import {PlayerComponent} from "./player/player.component";
import {StadiumComponent} from "./stadium/stadium.component";
import {TeamComponent} from "./team/team.component";
import { LeagueEditComponent } from './league/league-edit/league-edit.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { StadiumEditComponent } from './stadium/stadium-edit/stadium-edit.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { LeagueCreateComponent } from './league/league-create/league-create.component';
import { PlayerCreateComponent } from './player/player-create/player-create.component';
import { StadiumCreateComponent } from './stadium/stadium-create/stadium-create.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import {TeamService} from "./team/team-service/team.service";
import {PlayerService} from "./player/player-service/player.service";
import {StadiumService} from "./stadium/stadium-service/stadium.service";
import {LeagueService} from "./league/league-service/league.service";
import {LeagueCardComponent} from "./league/league-card/league-card.component";
import {TeamCardComponent} from "./team/team-card/team-card.component";
import {PlayerCardComponent} from "./player/player-card/player-card.component";
import {StadiumCardComponent} from "./stadium/stadium-card/stadium-card.component";
import {ImpressumComponent} from "./impressum/impressum.component";
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {LeagueViewComponent} from "./league/league-view/league-view.component";
import {TeamViewComponent} from "./team/team-view/team-view.component";
import {StadiumViewComponent} from "./stadium/stadium-view/stadium-view.component";
import {PlayerViewComponent} from "./player/player-view/player-view.component";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserModule,
    RouterModule.forChild(BASKETBALL_ROUTES),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCb7vs7RG6Dy7yacMnyD_QozO7lPc6VRGo'
    })

  ],
  declarations: [
    LeagueComponent,
    PlayerComponent,
    StadiumComponent,
    TeamComponent,
    LeagueEditComponent,
    PlayerEditComponent,
    StadiumEditComponent,
    TeamEditComponent,
    LeagueCreateComponent,
    TeamCreateComponent,
    PlayerCreateComponent,
    StadiumCreateComponent,
    LeagueCardComponent,
    StadiumCardComponent,
    TeamCardComponent,
    PlayerCardComponent,
    ImpressumComponent,
    LeagueViewComponent,
    TeamViewComponent,
    StadiumViewComponent,
    PlayerViewComponent,
    StadiumViewComponent

  ],
  providers:[
    TeamService,
    PlayerService,
    StadiumService,
    LeagueService
  ],
  exports:[

  ]
})
export class BasketballModule{}
