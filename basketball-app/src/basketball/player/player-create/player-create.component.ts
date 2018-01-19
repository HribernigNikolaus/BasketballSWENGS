import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerService} from "../player-service/player.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Player} from "../../entities/player";
import {Team} from "../../entities/team";

@Component({
  selector: 'player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {

  id: string;
  showDetails: string;

  player: Player;
  errors: string;
  allTeams:Array<Team> = [];

  playerForm: FormGroup;

  teamOfPlayer:Team;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private fb: FormBuilder,
    private router:Router) {}



  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.showDetails = params['showDetails'];

        this.playerService.create(this.id).subscribe(
          player => { this.player = player; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );
        this.playerService.findTeamByID("1").subscribe(team => { this.teamOfPlayer = team; this.errors = ''; },
          err => {this.errors = 'Fehler!'; }
      );
      }
    )


    this.playerService.findAllTeams().then(teams=>this.allTeams = teams).catch(err=>console.log(err))

    this.playerForm = this.fb.group({
      id: [],
      firstName: [],
      lastName: [],
      dayOfBirth: [],
      marketValue: [],
      playerNumber : [],
      height : [],
      position : [],
      team : [],
      version : []

    })
  }

  createPlayer() {
    this.playerService.createPlayer(this.player, this.teamOfPlayer.id);


  }


}
