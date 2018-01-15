import {League} from "../../entities/league";
import {LeagueService} from "../league-service/league.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'stadium-edit',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent implements OnInit {

  id: string;
  showDetails: string;

  league: League;
  errors: string;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.leagueService.findById(this.id).subscribe(
          league => { this.league = league; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
      }
    )

    this.editForm = this.fb.group({
      name: [],
      fullName: [],
      teamCount: [],
      foundationYear: [],
      teams : [],
 
    })
  }

  saveStadium() {
    this.leagueService.save(this.league).subscribe(
      league => {
        this.league = league;
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
