import { Component, OnInit } from '@angular/core';
import {Stadium} from "../../entities/stadium";
import {StadiumService} from "../stadium-service/stadium.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormBuilder} from '@angular/forms';
import {Team} from "../../entities/team";


@Component({
  selector: 'stadium-edit',
  templateUrl: './stadium-edit.component.html',
  styleUrls: ['./stadium-edit.component.css']
})
export class StadiumEditComponent implements OnInit {

  id: string;
  showDetails: string;

  stadium: Stadium;
  allTeams:Array<Team> = [];
  teamsOfStadium: Array<Team>;
  errors: string;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private stadiumService: StadiumService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        // if(this.id != null)
        //{
        this.showDetails = params['showDetails'];
        this.stadiumService.findById(this.id).subscribe(
          stadium => {
            this.stadium = stadium;
            this.errors = '';
            this.stadiumService.findTeamsOfStadium(this.stadium).then(
              teams => {
                this.teamsOfStadium = teams;
                this.stadium.teams = teams;
                //console.log(this.teamsOfStadium);
                this.errors = '';
              }).catch(
              err => {
                this.errors = 'Fehler!';
                console.log("ERRRROOOOOORRRRR")
              }
            );
            this.stadiumService
              .findAllTeams().then(teams => {this.allTeams = teams; console.log(this.allTeams)})
              .catch(err => console.log(err));
          },
          err => {
            this.errors = 'Fehler!';
          }
        );

      }
    )
  }


  saveStadium() {
    console.log(this.teamsOfStadium)
    for(let team of this.stadium.teams) {
      let isFound = false;

      for(let newTeam of this.teamsOfStadium) {

        if (team.id == newTeam.id) {
          isFound = true;
          console.log(team)

        }
      }
      if(!isFound)
      {
        this.stadiumService.deleteTeamsOfStadium(this.stadium, team).subscribe();
      }

    }
    this.stadiumService.saveTeamAndStadium(this.stadium, this.teamsOfStadium).subscribe(
      stadium => {
        this.stadium = stadium;
        //console.log(player.team.id);
        //this.teamOfPlayer.id=player.team.id;
        //console.log(this.teamOfPlayer.name)

        //console.log(stadium.teams)
        this.router.navigate(['/stadium']);
        //console.log("DOONNNNEEE")
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }

    );

  }
}

