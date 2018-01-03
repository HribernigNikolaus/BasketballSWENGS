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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild(BASKETBALL_ROUTES)
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
    StadiumCreateComponent
  ],
  providers:[

  ],
  exports:[

  ]
})
export class BasketballModule{}
