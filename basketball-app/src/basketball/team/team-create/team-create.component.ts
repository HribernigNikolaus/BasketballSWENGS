import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Team} from "../../entities/team";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../team-service/team.service";
import {Stadium} from "../../entities/stadium";
import {League} from "../../entities/league";
import {Player} from "../../entities/player";

@Component({
  selector: 'team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  id: string;
  showDetails: string;

  team: Team;
  errors: string;

  stadium: Stadium;
  allStadiums: Array<Stadium>;
  allPlayers:Array<Player>;
  allLeagues:Array<League>;
  playersOfTeam:Array<Player>;
  stadiumOfTeam:Stadium;
  leagueOfTeam:League;

  teamForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.teamService.create(this.id).subscribe(
          team => { this.team = team; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
        this.teamService.findStadiumByID("1").subscribe(stadium => { this.stadiumOfTeam = stadium; this.errors = ''; },
          err => {this.errors = 'Fehler!'; });

        this.teamService.findLeagueByID("1").subscribe(league => { this.leagueOfTeam = league; this.errors = ''; },
          err => {this.errors = 'Fehler!'; });

        this.teamService.findAllPlayers().then(players => this.allPlayers = players).catch(err=>console.log(err));
        this.teamService.findAllLeagues().then(leagues => this.allLeagues = leagues).catch(err=>console.log(err));
        this.teamService.findAllStadiums().then(stadiums => this.allStadiums = stadiums).catch(err=>console.log(err));

      }
    )

  }

  saveTeam() {
    this.team.players = this.playersOfTeam;
    this.team.league = this.leagueOfTeam;
    this.team.stadium = this.stadiumOfTeam;
    this.teamService.createNew(this.team).subscribe(
      team => {
        this.team = team;
        this.teamService.saveLeagueOfTeam(this.team, this.leagueOfTeam).subscribe(
          league=>{
            this.teamService.saveStadiumOfTeam(this.team, this.stadiumOfTeam).subscribe(
              stadium=> {
                for (let player of this.playersOfTeam) {
                  this.teamService.savePlayerOfTeam(this.team, player.id).subscribe(
                    player =>{ console.log("Player saved");
                    }
                  )
                }

              },

              err=> { this.errors = 'Error saving data'; }
            );
              },
          err=> { this.errors = 'Error saving data'; }
        ),
          err=> { this.errors = 'Error saving data'; }
        this.router.navigate(['/team']);

      },
      err=> { this.errors = 'Error saving data'; }

    );
  }

}
