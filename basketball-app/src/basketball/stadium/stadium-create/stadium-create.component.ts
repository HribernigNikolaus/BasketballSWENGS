import {Stadium} from "../../entities/stadium";
import {StadiumService} from "../stadium-service/stadium.service";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../../entities/team";

@Component({
  selector: 'stadium-create',
  templateUrl: './stadium-create.component.html',
  styleUrls: ['./stadium-create.component.css'],

})
export class StadiumCreateComponent implements OnInit {

  id: string;
  showDetails: string;

  stadium: Stadium;
  errors: string;

  stadiumForm: FormGroup;
  allTeams:Array<Team> = [];
  teamsOfStadium:Array<Team>;

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
        this.showDetails = params['showDetails'];

        this.stadiumService.create(this.id).subscribe(
          stadium => { this.stadium = stadium; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
        /*this.stadiumService.findTeamByID("1").subscribe(team => { this.teamOfStadium = team; this.errors = ''; },
          err => {this.errors = 'Fehler!'; }
        );*/
        this.showDetails = params['showDetails'];
       /* this.stadiumService.findById(this.id).subscribe(
          stadium => {
            this.stadium = stadium;
            this.errors = '';}
        );*/
        this.stadiumService
          .findAllTeams().then(teams => {this.allTeams = teams; console.log(this.allTeams)})
          .catch(err => console.log(err));
      },
      err => {
        this.errors = 'Fehler!';
      }
    );





    this.stadiumForm = this.fb.group({
      id: [],
      buildDate: [],
      city: [],
      land: [],
      name: ['', Validators.required, Validators.min(4), Validators.max(24)],
      plz : [],
      streetAndNumber : [],
      teams : [],
      visitorLimit : []

    })
  }

  saveStadium() {
    this.stadium.teams = this.teamsOfStadium;
    console.log(this.teamsOfStadium);
    this.stadiumService.createNew(this.stadium).subscribe(
      stadium => {
        this.stadium = stadium;
        for(let team of this.teamsOfStadium)
        {
          console.log(team);
          console.log(stadium);
          this.stadiumService.saveTeamOfStadium(this.stadium, team.id).subscribe(
            team=>      {console.log("Team created");
              //console.log("Team eddided")
            },
            err=>{console.error('Fehler beim Speichern')}
          )}
        this.router.navigate(['/stadium']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
