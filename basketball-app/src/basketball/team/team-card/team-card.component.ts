import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from "../../entities/team";

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html'
})
export class TeamCardComponent implements OnInit {

  constructor() { }
  @Input() item: Team;
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
