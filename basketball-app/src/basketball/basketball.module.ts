import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BASKETBALL_ROUTES} from "./basketball.routes";
import {LeagueComponent} from "./league/league.component";
import {PlayerComponent} from "./player/player.component";
import {StadiumComponent} from "./stadium/stadium.component";
import {TeamComponent} from "./team/team.component";

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
    TeamComponent
  ],
  providers:[

  ],
  exports:[

  ]
})
export class BasketballModule{}
