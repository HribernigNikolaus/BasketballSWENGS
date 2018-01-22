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
  teamOfStadium: Team;
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
            this.stadiumService
              .findAllTeams().then(teams => this.allTeams = teams)
              .catch(err => console.log(err));

         /*   this.stadiumService.findTeamOfStadium(this.stadium).subscribe(
              team => {
                this.teamOfStadium = team;
                this.errors = '';
              },
              err => {
                this.errors = 'Fehler!';
                console.log("ERRRROOOOOORRRRR")
              }
            );

          },
          err => {
            this.errors = 'Fehler!';
          }
        );

      }
    )
  }*/


  /*saveStadium() {
    this.stadiumService.saveTeamAndStadium(this.stadium, this.teamOfStadium.id).subscribe(
      stadium => {
        this.stadium = stadium;
        this.router.navigate(['/stadium']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }

    );

  }
*/
}

