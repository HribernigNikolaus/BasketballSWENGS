import {Component, OnInit} from "@angular/core";
import {League} from "../../entities/league";
import {LeagueService} from "../league-service/league.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {

  id: string;
  showDetails: string;
  league: League;
  errors: string;

  editForm: FormGroup;

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
          league => { this.league = league; this.errors=''; },
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
    this.leagueService.save(this.league).subscribe(
      league => {
        this.league = league;
        this.router.navigate(['/league']);
        this.errors = 'Saving was successful!';
              },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
