import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {LeagueService} from "../league-service/league.service";
import {League} from "../../entities/league";

@Component({
  selector: 'league-view',
  templateUrl: './league-view.component.html',
  styleUrls: ['./league-view.component.css']
})
export class LeagueViewComponent implements OnInit {
  id: string;
  showDetails: string;
  league: League;
  errors: string;


  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private fb: FormBuilder,
    private router:Router
  ) { }


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.leagueService.findById(this.id).subscribe(
          league => {
            this.league = league;
            this.errors = '';
          },
          err => {
            this.errors = 'Fehler!';
          }
        );
      }
    )

  }

}
