import {Component, OnInit} from "@angular/core";
import {StadiumService} from "./stadium-service/stadium.service";
import {Team} from "../entities/team";
import {Stadium} from "../entities/stadium";

@Component({
  selector: 'stadium',
  templateUrl: './stadium.component.html'
})
export class StadiumComponent implements OnInit {

  id : number;
  name : string;

  teams : Array<Team>;
  selectedStadium:Stadium;
  message:string;

  allStadiums:Array<Stadium> = [];

  basket: object = {

  };

  constructor (private stadiumService:StadiumService) {}
  ngOnInit(){
    this.stadiumService.findAll().then(stadiums => this.allStadiums = stadiums).catch(err=>console.log(err))

  }

  saveStadium(): void {
    this.stadiumService.save(this.selectedStadium).subscribe(
      player => {
        this.selectedStadium = player;
        this.message = "Erfolgreich gespeichert!";
      },
      errResponse => {
        console.error('Fehler beim Speichern', errResponse);
        this.message = "Fehler beim Speichern: ";
      }
    );
  }

  showAllStadiums(): void {
    this.stadiumService.findAll()
      .then(stadiums => this.allStadiums = stadiums)
      .catch(err=>console.log(err))
  }

  select(s:Stadium): void{
    this.selectedStadium = s;
  }
}
