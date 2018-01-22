import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlayerService} from "../player-service/player.service";
import {Player} from "../../entities/player";
import {Team} from "../../entities/team";

@Component({
  selector: 'player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  id: string;
  showDetails: string;

  player: Player;
  errors: string;

  allTeams:Array<Team> = [];

  teamOfPlayer:Team;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        // if(this.id != null)
        //{
        this.showDetails = params['showDetails'];
        this.playerService.findById(this.id).subscribe(
          player => {
            this.player = player;
            this.errors = '';
            this.playerService
              .findAllTeams().then(teams => this.allTeams = teams)
              .catch(err => console.log(err));

            this.playerService.findTeamOfPlayer(this.player).subscribe(
              team => {
                this.teamOfPlayer = team;
                this.errors = '';
              },
              err => {
                this.errors = 'Fehler!';
                console.log("ERRRROOOOOORRRRR")
              }
            );

          },
          err => {
            this.errors = 'Fehler!';
          }
        );

      }
    )
  }

  savePlayer() {
    this.playerService.saveTeamAndPlayer(this.player, this.teamOfPlayer.id).subscribe(
      player => {
        this.player = player;
        //console.log(players.team.id);
        //this.teamOfPlayer.id=players.team.id;
        //console.log(this.teamOfPlayer.name)

        this.router.navigate(['/players']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }

    );

  }

}
