import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TeamService} from "../team-service/team.service";
import {Stadium} from "../../entities/stadium";
import {Team} from "../../entities/team";

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
  allStadiums: Array<Stadium>;


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
          team => { this.team = team; this.errors = ''; },
          err => {this.errors = 'Fehler!'; }
        );
        this.teamService.findStadium(this.id).subscribe(
          stadium => {this.stadium = stadium; this.errors  = ''; },
          err => {this.errors = 'Fehler!';
          }
        );
        this.teamService.findStadiums()
          .then(stadiums => this.allStadiums = stadiums).catch(err => console.log(err));

      }
    );

  }

}
