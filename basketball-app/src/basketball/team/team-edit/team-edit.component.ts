import { Component, OnInit } from '@angular/core';
import {League} from "../../entities/league";
import {ActivatedRoute, Router} from "@angular/router";
import {LeagueService} from "../../league/league-service/league.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Team} from "../../entities/team";
import {TeamService} from "../team-service/team.service";

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

  editForm: FormGroup;

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

        this.teamService.findById(this.id).subscribe(
          team => { this.team = team; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
      }
    )

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


  saveLeague() {
    this.teamService.save(this.team).subscribe(
      team => {
        this.team = team;
        this.router.navigate(['/league']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
