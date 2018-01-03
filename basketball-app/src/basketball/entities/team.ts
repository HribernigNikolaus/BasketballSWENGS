import {Player} from "./player";
import {Stadium} from "./stadium";
import {League} from "./league";

export interface Team{
  id: number;
  name : string;
  hometown : string;
  startDate : string;
  mascot : string;
  players : Array<Player>;
  stadium : Stadium;
  league : League;
}
