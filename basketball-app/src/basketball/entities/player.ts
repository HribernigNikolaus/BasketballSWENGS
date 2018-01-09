import {Team} from "./team";
import {DatePipe} from "@angular/common";

export interface Player{

  id : number;
  firstName : string;
  lastName: string;
  dayOfBirth : Date; //TODO: eigentlich Date?
  marketValue : number;
  playerNumber : number;
  height : number;
  position : string;
  team : Team;
  version: number;


}
