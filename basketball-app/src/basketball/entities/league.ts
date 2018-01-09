import {Team} from "./team";

export interface League{
  id : number;
  foundation_year:number;
  fullName : string;
  land : string;
  name: string;
  teamCount: number;
  teams : Array<Team>;
  version: number;
}

