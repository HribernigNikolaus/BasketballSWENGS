import {Routes} from "@angular/router";
import {LeagueComponent} from "./league/league.component";
import {PlayerComponent} from "./player/player.component";
import {StadiumComponent} from "./stadium/stadium.component";
import {TeamComponent} from "./team/team.component";

export const BASKETBALL_ROUTES: Routes = [
  {
    path: 'league',
    component: LeagueComponent
  },
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'stadium',
    component: StadiumComponent
  },
  {
    path:'team',
    component: TeamComponent
  }
];
