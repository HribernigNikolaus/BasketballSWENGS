import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {League} from "../../entities/league";

@Component({
  selector: 'league-card',
  templateUrl: './league-card.component.html'
})
export class LeagueCardComponent implements OnInit {

  constructor() { }
  @Input() item: League;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

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



}
