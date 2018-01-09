import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stadium} from "../../entities/stadium";
import {StadiumComponent} from "../stadium.component";
import {StadiumService} from "../stadium-service/stadium.service";
import {Team} from "../../entities/team";

@Component({
  selector: 'stadium-card',
  templateUrl: './stadium-card.component.html'
})
export class StadiumCardComponent implements OnInit {

  constructor(private stadiumService:StadiumService) { }
  @Input() item: Stadium;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  teams : Array<Team>;

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
