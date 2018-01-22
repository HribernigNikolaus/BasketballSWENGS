import { Component, OnInit } from '@angular/core';
import {Player} from "../../entities/player";
import {Team} from "../../entities/team";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerService} from "../player-service/player.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {

  id: string;
  showDetails: string;

  player: Player;
  errors: string;

  allTeams:Array<Team> = [];
  teamOfPlayer:Team;


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
          },
          err => {
            this.errors = 'Fehler!';
          }
        );

      }
    )
  }




}
