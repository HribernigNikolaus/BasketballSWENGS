import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TeamService} from "../team-service/team.service";
import {Stadium} from "../../entities/stadium";
import {Team} from "../../entities/team";
import {League} from "../../entities/league";
import {Player} from "../../entities/player";

@Component({
  selector: 'team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  id: string;
  showDetails: string;
  team: Team;
  errors: string;
  stadium: Stadium;
  allPlayers: Array<Player>;
  league: League;
  playersOfTeam:Array<Player>;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.teamService.findById(this.id).subscribe(
          team => { this.team = team; this.errors = '';
            this.teamService.findPlayersOfTeam(this.team)
              .then(stadiums => this.playersOfTeam = stadiums).catch(err => console.log(err));},
          err => {this.errors = 'Fehler!'; }
        );
        this.teamService.findStadium(this.id).subscribe(
          stadium => {this.stadium = stadium; this.errors  = ''; },
          err => {this.errors = 'Fehler!';
          }
        );


        this.teamService.findLeague(this.id).subscribe(
          league => {this.league = league; this.errors  = ''; },
          err => {this.errors = 'Fehler!';
          }
        );
      }
    );

  }

}
