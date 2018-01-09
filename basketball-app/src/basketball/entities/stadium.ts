import {Team} from "./team";

export interface Stadium{
  id : number;
  buildDate : string; //TODO: Eigentlich Date?
  city : string;
  land : string;
  name : string;
  plz : number;
  streetAndNumber : string;
  teams : Array<Team>;
  visitorLimit : number;
}
