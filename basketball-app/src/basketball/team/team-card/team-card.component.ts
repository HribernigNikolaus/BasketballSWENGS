import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from "../../entities/team";
import {TeamService} from "../team-service/team.service";
import {Player} from "../../entities/player";

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



}
