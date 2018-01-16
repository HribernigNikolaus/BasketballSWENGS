
import {Component, OnInit} from "@angular/core";
import {League} from "../entities/league";
import {Team} from "../entities/team";
import {LeagueService} from "./league-service/league.service";
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'league',
  templateUrl: './league.component.html'
})
export class LeagueComponent implements OnInit {
  id : number;
  foundation_year:number;
  fullName : string;
  land : string;
  name: string;
  teamCount: number;
  teams : Array<Team>;
  selectedLeague:League;
  message:string;

  allLeagues:Array<League> = [];

  basket: object = {};

  searchField: FormControl;
  searches: string[] = [];

  constructor (private leagueService:LeagueService) {}
  ngOnInit(){
    this.leagueService.findAll().then(leagues => this.allLeagues = leagues).catch(err=>console.log(err))
    
/* //TODO: reaktive suchfunktion
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {this.searches.push(term);
      });
*/
  }

  showAllLeagues(): void {
    this.leagueService.findAll()
      .then(leagues => this.allLeagues = leagues)
      .catch(err=>console.log(err))
  }


  select(l:League): void{
    this.selectedLeague = l;
  }
}
