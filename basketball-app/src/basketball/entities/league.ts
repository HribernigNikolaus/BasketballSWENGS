import {Team} from "./team";

export interface League{
  id : number;
  name : string;
  land : string;
  teams : Array<Team>;
}
