import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Team} from "../../entities/team";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../team-service/team.service";

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
