import {Component, OnInit} from "@angular/core";
import {LeagueService} from "../league-service/league.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {League} from "../../entities/league";
import {Team} from "../../entities/team";

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
  allTeams:Array<Team> = [];
  teamsOfLeague:Array<Team>=[];


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
          league => { this.league = league; this.errors='';
            this.leagueService.findTeamsOfLeague(this.league).then(
              teams => {
                this.teamsOfLeague = teams;
                this.league.teams = teams;
                //console.log(this.teamsOfStadium);
                this.errors = '';
              }).catch(
              err => {
                this.errors = 'Fehler!';
                console.log("ERRRROOOOOORRRRR")
              }
            );
            this.leagueService
              .findAllTeams().then(teams => {this.allTeams = teams; console.log(this.allTeams)})
              .catch(err => console.log(err));

          },
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
      //console.log(this.teamsOfStadium)
      for(let team of this.league.teams) {
        let isFound = false;

        for(let newTeam of this.teamsOfLeague) {

          if (team.id == newTeam.id) {
            isFound = true;
            console.log(team)

          }
        }
        if(!isFound)
        {
          this.leagueService.deleteTeamsOfLeague(this.league, team).subscribe();
        }

      }
      this.leagueService.saveTeamAndLeague(this.league, this.teamsOfLeague).subscribe(
        league => {
          this.league = league;
          this.router.navigate(['/league']);
          this.errors = 'Saving was successful!';
        },
        err=> { this.errors = 'Error saving data'; }

      );
  }

}
