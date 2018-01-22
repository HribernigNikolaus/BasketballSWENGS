import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from "../../entities/team";
import {TeamService} from "../team-service/team.service";
import {Player} from "../../entities/player";
import {Stadium} from "../../entities/stadium";
import {League} from "../../entities/league";

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent implements OnInit {

  constructor(private teamService:TeamService) { }
  @Input() item: Team;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  playersOfTeam:Array<Player>=[];
  errors:String;
  stadiumOfTeam:Stadium;
  leagueOfTeam:League;

  ngOnInit() {
    this.teamService.findPlayersOfTeam(this.item).then(
    players=> this.item.players = players).catch(err=>console.log(err));
    }

  select() {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }
  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }
deleteTeam(item:Team){
    this.teamService.findPlayersOfTeam(item).then(players=>{for(let player of players){
      this.teamService.deletePlayerOfTeam(item, player).subscribe()
    }
    this.teamService.deleteTeam(item).subscribe(team=>{console.log("Erfolgreich");
    window.location.reload();console.log("Redirection");
  },err=>console.error("Error while deleting Stadium"));
}).catch(
    err => {
  this.errors = 'Fehler!';
  console.log("ERRRROOOOOORRRRR")
}
);
}


}
