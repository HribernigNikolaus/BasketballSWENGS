import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Player} from "../../entities/player";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";
import {Router} from "@angular/router";


@Injectable()
export class PlayerService{

  constructor(private http: HttpClient, private router:Router){

  }

  findAll(): Promise<Array<Player>>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Player>>(url,{headers}).
    toPromise().
    then(players => players['_embedded']['players']);
  }

  save(player:Player): Observable<Player>{
    this.saveTeamOfPlayer(player, player.team.id)
    let url= 'http://localhost:8080/players/' + player.id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<Player>(url, player,{headers});
  }
  saveTeamAndPlayer(player:Player, teamId:number): Observable<Player>{
    this.saveTeamOfPlayer(player, teamId).subscribe(
      team=>{player.team=team;
      console.log("Team eddided")},
      err=>{console.error('Fehler beim Speichern')}
    )
    let url= 'http://localhost:8080/players/' + player.id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<Player>(url, player,{headers});
  }

  saveTeamOfPlayer(player:Player ,teamId:number):Observable<Team>{
    let url= 'http://localhost:8080/players/' + player.id + '/team';
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    console.log(player.lastName);
    console.log(teamId);

    let changeUrl = 'http://localhost:8080/teams/'+ teamId
    return this.http.put<Team>(url, changeUrl,{headers});
  }
  createTeamOfPlayer(player:Player ,teamId:number):Observable<Team>{
    let url= 'http://localhost:8080/players/' + player.id + '/team';
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    console.log(player.lastName);
    console.log(teamId);

    let changeUrl = 'http://localhost:8080/teams/'+ teamId
    return this.http.put<Team>(url, changeUrl,{headers});
  }


  createPlayer(player:Player, teamId:number):void{
    this.createPlayerInstance(player)
      .subscribe(player=>{this.createTeamOfPlayer(player, teamId)
          .subscribe(team=>{player.team=team;},
              err=>console.error("Error saving team of Player"));this.router.navigate(['/players']);}
      ,err=>{console.error('Fehler beim Speichern')});

  }

  createPlayerInstance(player:Player):Observable<Player> {
    let url = 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json').set('Content-Type', 'application/json');;
    return this.http.post<Player>(url, player, {headers});
  }


  findById(id: string): Observable<Player>{

    const url = 'http://localhost:8080/players/'+id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Player>(url, {headers});
  }
  create(id: string): Observable<Player>{

    const url = 'http://localhost:8080/players/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Player>(url, {params,headers});
  }
  findAllTeams(): Promise<Array<Team>>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url,{headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }
  findTeamOfPlayer(player:Player): Observable<Team>{
    const url = 'http://localhost:8080/players/'+player.id+'/team';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {headers});
  }
  findTeamByID(id: string): Observable<Team>{
    const url = 'http://localhost:8080/teams/'+id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {headers});
  }

  deletePlayer(id:string): Observable<Player> {
    let url = 'http://localhost:8080/players/'+id;
    let headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<Player>(url, { headers });
  }

}
