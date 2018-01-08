import {Component, OnInit} from "@angular/core";
import {Player} from "../entities/player";
import {Team} from "../entities/team";
import {PlayerService} from "./player-service/player.service";

@Component({
  selector: 'player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {

  id : number;
  height : number;
  weight : number;
  position : string;
  team : Team;
  selectedPlayer:Player;
  message:String;
  allPlayers:Player[];

  basket: object = {

    "3": true,
    "4": false,
    "5": true

  };

  constructor (private playerService:PlayerService) {}
  ngOnInit(){

  }

  savePlayer(): void {
    this.playerService.save(this.selectedPlayer).subscribe(
      player => {
        this.selectedPlayer = player;
        this.message = "Erfolgreich gespeichert!";
      },
      errResponse => {
        console.error('Fehler beim Speichern', errResponse);
        this.message = "Fehler beim Speichern: ";
      }
    );
  }

  showAllPlayers(): void {
    this.playerService.findAll().subscribe(
      (players:Player[])=>{
        this.allPlayers = players;},
      (errResp) =>{console.error("Loading failed", errResp)}
      );

  }

  select(p:Player): void{
    this.selectedPlayer = p;
  }
}
