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

    "3": true,
    "4": false,
  };

  constructor (private stadiumService:StadiumService) {}
  ngOnInit(){

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



  /*showAllStadiums(): void {
    this.stadiumService.findAll().subscribe(
      (stadiums:Stadium[])=>{
        //this.allStadiums = stadiums.map(Stadium, function(el) { return el });
       //console.log(Object.values(stadiums)[0] as Array<Stadium>);
        console.log(this.allStadiums)
        console.log(Object.values(stadiums)[0])
        for (let entry of Object.values(stadiums))
        {
          console.log(Object.keys(entry as Stadium));
          console.log("BLAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          //this.allStadiums.push(Object.keys(entry).map(key=>entry[key]));
        }
        console.log(this.allStadiums)
        //this.allStadiums = Object.keys(stadiums).map(key=>stadiums[key])
        //this.allStadiums = stadiums;
        },
      (errResp) =>{console.error("Loading failed", errResp)}
    );

  }*/


  showAllStadiums(): void {
    this.stadiumService.findAll()
      .then(stadiums => this.allStadiums = stadiums)
      .catch(err=>console.log(err))
  }

  select(s:Stadium): void{
    this.selectedStadium = s;
  }
}
