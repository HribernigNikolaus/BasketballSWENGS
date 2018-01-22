import { Component, OnInit } from '@angular/core';
import {League} from "../../entities/league";
import {ActivatedRoute, Router} from "@angular/router";
import {LeagueService} from "../../league/league-service/league.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Team} from "../../entities/team";
import {TeamService} from "../team-service/team.service";
import {Stadium} from "../../entities/stadium";
import {Player} from "../../entities/player";

@Component({
  selector: 'team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  id: string;
  showDetails: string;
  team: Team;
  errors: string;
  allPlayers:Array<Player>=[];
  playersOfTeam:Array<Player>=[];
  allStadiums:Array<Stadium>=[];
  allLeagues:Array<League>=[];
  stadiumOfTeam:Stadium;
  leagueOfTeam:League;

  editForm: FormGroup;

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
          team => { this.team = team;console.log(team); this.errors = ''; this.teamService.findPlayersOfTeam(this.team).then(
            players => {
              this.playersOfTeam = players;
              this.team.players = players;

              console.log(this.playersOfTeam);
              //console.log(this.teamsOfStadium);
              this.errors = '';
            }).catch(
            err => {
              this.errors = 'Fehler!';
              console.log("ERRRROOOOOORRRRR")
            })},
          err => {this.errors = 'Fehler!'; }
        );
        this.teamService.findStadium(this.id).subscribe(
          stadium => {this.stadiumOfTeam = stadium; this.errors  = ''; },
          err => {this.errors = 'Fehler!';
          }
        );
        this.teamService.findAllPlayers().then(players => this.allPlayers = players).catch(err=>console.log(err));
        this.teamService.findAllLeagues().then(leagues => this.allLeagues = leagues).catch(err=>console.log(err));
        this.teamService.findAllStadiums().then(stadiums => this.allStadiums = stadiums).catch(err=>console.log(err));
        this.teamService.findLeague(this.id).subscribe(
          league => {this.leagueOfTeam = league; this.errors  = ''; },
          err => {this.errors = 'Fehler!';
          }
        );





      }
    );


    /*    this.editForm = this.fb.group({
          name: [],
          fullName: [],
          teamCount: [],
          foundationYear: [],
         // teams : [],

        })
    */
    /* Filling the form with values from db?
       this.editForm.patchValue({
           name: this.league.name,
         fullName: this.league.fullName,
         teamCount: this.league.teamCount,
         foundationYear: this.league.foundationYear
         }
       )
       */
  }


  saveLeague(team:Team) {
    this.team.players = team.players;
    console.log(team.players);
    for(let player of this.team.players) {
      let isFound = false;

      for(let newPlayer of this.playersOfTeam) {

        if (player.id == newPlayer.id) {
          isFound = true;
          console.log(player)

        }
      }
      if(!isFound)
      {
        this.teamService.deletePlayerOfTeam(this.team, player).subscribe();
      }

    }
    this.teamService.saveAllUpdate(this.team, this.playersOfTeam, this.stadiumOfTeam, this.leagueOfTeam)
  }

}
