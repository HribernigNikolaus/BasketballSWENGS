import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stadium} from "../../entities/stadium";
import {StadiumComponent} from "../stadium.component";
import {StadiumService} from "../stadium-service/stadium.service";
import {Team} from "../../entities/team";
import {Router} from "@angular/router";

@Component({
  selector: 'stadium-card',
  templateUrl: './stadium-card.component.html'
})
export class StadiumCardComponent implements OnInit {

  constructor(private stadiumService:StadiumService, private routerRouter:Router) { }
  @Input() item: Stadium;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  teams : Array<Team>;
  errors:String;
  stadium:Stadium;

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

  deleteStadium(stadium:Stadium){
  this.stadium = stadium;
    this.stadiumService.findTeamsOfStadium(this.stadium).then(
      teams => {
        this.stadium.teams = teams;
        this.errors = '';
        for(let team of stadium.teams) {
          this.stadiumService.deleteTeamsOfStadium(stadium, team).subscribe();
        }
        this.stadiumService.deleteStadium(this.stadium).subscribe(stadium=>{console.log("Erfolgreich");
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
