import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerService} from "../player-service/player.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Player} from "../../entities/player";

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

  playerForm: FormGroup;

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
      }
    )

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

  savePlayer() {
    this.playerService.save(this.player).subscribe(
      player => {
        this.player = player;
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }
  createPlayer(){
    console.log(this.player.firstName + " " + this.player.lastName);
    this.playerService.createPlayer(this.player).subscribe(
      player => {
        this.player = player;
        this.router.navigate(['/player']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );
  }

}
