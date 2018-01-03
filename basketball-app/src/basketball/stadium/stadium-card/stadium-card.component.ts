import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stadium} from "../../entities/stadium";

@Component({
  selector: 'stadium-card',
  templateUrl: './stadium-card.component.html'
})
export class StadiumCardComponent implements OnInit {

  constructor() { }
  @Input() item: Stadium;
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
