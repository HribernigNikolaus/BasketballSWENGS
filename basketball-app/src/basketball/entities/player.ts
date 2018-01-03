import {Team} from "./team";

export interface Player{

  id : number;
  firstName : string;
  lastName: string;
  dayOfBirth : string;
  marketValue : number;
  playerNumber : number;
  height : number;
  weight : number;
  position : string;
  team : Team;


}
