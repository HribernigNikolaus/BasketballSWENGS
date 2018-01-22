import {League} from "../../entities/league";
import {LeagueService} from "../league-service/league.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../../entities/team";

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
  allTeams:Array<Team>;
  teamsOfLeague:Array<Team>;

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

        this.leagueService.create(this.id).subscribe(
          league => { this.league = league; this.errors='';
            this.leagueService
              .findAllTeams().then(teams => {this.allTeams = teams; console.log(this.allTeams)})
              .catch(err => console.log(err));},
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

  saveLeague() {
    this.league.teams = this.teamsOfLeague;
    //console.log(this.teamsOfStadium);
    this.leagueService.createNew(this.league).subscribe(
      league => {
        this.league = league;
        for(let team of this.teamsOfLeague)
        {
          //console.log(team);
          //console.log(stadium);
          this.leagueService.saveTeamOfLeague(this.league, team.id).subscribe(
            team=>      {console.log("Team created");
              //console.log("Team eddided")
            },
            err=>{console.error('Fehler beim Speichern')}
          )}
        this.router.navigate(['/league']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
