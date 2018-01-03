import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../../entities/player";

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html'
})
export class PlayerCardComponent implements OnInit {

  constructor() { }
  @Input() item: Player;
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
