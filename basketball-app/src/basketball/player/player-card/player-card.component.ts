import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../../entities/player";
import {PlayerService} from "../player-service/player.service";
import {Team} from "../../entities/team";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html'
})
export class PlayerCardComponent implements OnInit {

  constructor(private playerService:PlayerService) { }
  @Input() item: Player;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  teamOfPlayer:Team;
  errors:String;

  ngOnInit() {
    this.playerService.findTeamOfPlayer(this.item).subscribe(
      team => { this.teamOfPlayer = team; this.errors=''; },
      err => {this.errors = 'Fehler!';console.log("ERRRROOOOOORRRRR") }
    );
  }

  select() {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }
  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }


}
