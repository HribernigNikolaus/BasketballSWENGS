import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlayerService} from "../player-service/player.service";
import {Player} from "../../entities/player";

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
          player => { this.player = player; this.errors=''; },
          err => {this.errors = 'Fehler!'; }
        );

      }
    )

  }

  savePlayer() {
    this.playerService.save(this.player).subscribe(
      player => {
        this.player = player;
        this.router.navigate(['/player']);
        this.errors = 'Saving was successful!';
      },
      err=> { this.errors = 'Error saving data'; }
    );

  }

}
