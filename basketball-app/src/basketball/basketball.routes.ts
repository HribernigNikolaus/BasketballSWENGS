import {Routes} from "@angular/router";
import {LeagueComponent} from "./league/league.component";
import {PlayerComponent} from "./player/player.component";
import {StadiumComponent} from "./stadium/stadium.component";
import {TeamComponent} from "./team/team.component";
import {TeamCreateComponent} from "./team/team-create/team-create.component";
import {PlayerCreateComponent} from "./player/player-create/player-create.component";
import {StadiumCreateComponent} from "./stadium/stadium-create/stadium-create.component";
import {LeagueCreateComponent} from "./league/league-create/league-create.component";
import {TeamEditComponent} from "./team/team-edit/team-edit.component";
import {PlayerEditComponent} from "./player/player-edit/player-edit.component";
import {StadiumEditComponent} from "./stadium/stadium-edit/stadium-edit.component";
import {LeagueEditComponent} from "./league/league-edit/league-edit.component";
import {ImpressumComponent} from "./impressum/impressum.component";

import {LeagueViewComponent} from "./league/league-view/league-view.component.component";
import {TeamViewComponent} from "./team/team-view/team-view.component";
import {PlayerViewComponent} from "./player/player-view/player-view.component";
import {StadiumViewComponent} from "./stadium/stadium-view/stadium-view.component";

export const BASKETBALL_ROUTES: Routes = [
  // Standard Components
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
  },
  {
    path:'stadium/team/:id',
    component: TeamComponent
  },
  {
    path:'league/team/:id',
    component: TeamComponent
  },
  {
    path:'impressum',
    component: ImpressumComponent
  },
  // ---------------------------------
  // Create Components
  {
    path:'team-create',
    component: TeamCreateComponent
  },
  {
    path:'player-create',
    component: PlayerCreateComponent
  },
  {
    path:'stadium-create',
    component: StadiumCreateComponent
  },
  {
    path:'league-create',
    component: LeagueCreateComponent
  },
  // ----------------------------------------
  // Edit Components
  {
    path:'team-edit/:id',
    component: TeamEditComponent
  },
  {
    path:'player-edit/:id',
    component: PlayerEditComponent
  },
  {
    path:'stadium-edit/:id',
    component: StadiumEditComponent
  },
  {
    path:'league-edit/:id',
    component: LeagueEditComponent
  },

  // --------------------------------------
  // View Components

  {
    path:'league-view/:id',
    component: LeagueViewComponent
  },
  {
    path:'team-view/:id',
    component: TeamViewComponent
  },
  {
    path:'player-view/:id',
    component: PlayerViewComponent
  },
  {
    path:'stadium-view/:id',
    component: StadiumViewComponent
  }
];
