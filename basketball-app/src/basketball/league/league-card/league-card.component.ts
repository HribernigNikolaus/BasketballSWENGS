import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {League} from "../../entities/league";
import {LeagueService} from "../league-service/league.service";

@Component({
  selector: 'league-card',
  templateUrl: './league-card.component.html'
})
export class LeagueCardComponent implements OnInit {

  constructor(private leagueService:LeagueService) { }
  @Input() item: League;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  league:League;
  errors:String;

  ngOnInit() {
  }
  select() {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }
  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }
  deleteLeague(item:League){
  this.league = item;
  this.leagueService.findTeamsOfLeague(this.league).then(
    teams => {
  this.league.teams = teams;
  this.errors = '';
  for(let team of item.teams) {
  this.leagueService.deleteTeamsOfLeague(item, team).subscribe();
}
this.leagueService.deleteLeague(this.league).subscribe(stadium=>{console.log("Erfolgreich");
  window.location.reload();console.log("Redirection");
},err=>console.error("Error while deleting Stadium"));
}).catch(
  err => {
    this.errors = 'Fehler!';
    console.log("ERRRROOOOOORRRRR")
  }
);}



}
