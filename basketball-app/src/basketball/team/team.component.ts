import {Component, OnInit} from "@angular/core";
import {TeamService} from "./team-service/team.service";
import {Player} from "../entities/player";
import {Stadium} from "../entities/stadium";
import {League} from "../entities/league";
import {Team} from "../entities/team";

@Component({
  selector: 'team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  id: number;
  name : string;

  players : Array<Player>;
  stadium : Stadium;
  league : League;

  selectedTeam: Team;

  message:string;

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {

  }

  saveTeam(): void {
    this.teamService.save(this.selectedTeam).subscribe(
      team => {
        this.selectedTeam = team;
        this.message = "Erfolgreich gespeichert!";
      },
      errResponse => {
        console.error('Fehler beim Speichern', errResponse);
        this.message = "Fehler beim Speichern: ";
      }
    );
  }

  select(t:Team): void{
    this.selectedTeam = t;
  }
}
