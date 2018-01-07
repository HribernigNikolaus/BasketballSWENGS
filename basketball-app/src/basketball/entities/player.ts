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
  weight : number; //TODO: not used anymore from database
  position : string;
  team : Team;


}
