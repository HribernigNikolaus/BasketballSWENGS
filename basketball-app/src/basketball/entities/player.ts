import {Team} from "./team";
import {DatePipe} from "@angular/common";

export interface Player{

  id : number;
  firstName : string;
  lastName: string;
  dayOfBirth : string; //TODO: eigentlich Date?
  marketValue : number;
  playerNumber : number;
  height : number;
  position : string;
  team : Team;


}
