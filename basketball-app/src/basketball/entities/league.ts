import {Team} from "./team";

export interface League{
  id : number;
  foundationYear:number;
  fullName : string;
  land : string;
  name: string;
  teamCount: number;
  teams : Array<Team>;
  version: number;
}

