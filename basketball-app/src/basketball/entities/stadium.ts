import {Team} from "./team";

export interface Stadium{
  id : number;
  name : string;
  land : string;
  city : string;
  streetAndNumber : string;
  plz : string;
  buildDate : string; //TODO: Eigentlich Date?
  visitorLimit : number;
  teams : Array<Team>;
}
