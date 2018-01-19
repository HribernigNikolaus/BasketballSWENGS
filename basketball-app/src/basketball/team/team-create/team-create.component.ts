import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Team} from "../../entities/team";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../team-service/team.service";
import {Stadium} from "../../entities/stadium";

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

  teamForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder
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

        this.teamService.findStadiums()
          .then(stadiums => this.allStadiums = stadiums).catch(err => console.log(err));

      }
    )

  }

  saveTeam() {
    this.teamService.save(this.team).subscribe(
      team => {
        this.team = team;
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
