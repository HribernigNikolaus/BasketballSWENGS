import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Player} from "../../entities/player";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";


@Injectable()
export class PlayerService{

  constructor(private http: HttpClient){

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

  saveTeamOfPlayer(player:Player ,teamid:number):Observable<Team>{
    let url= 'http://localhost:8080/players/' + player.id + '/team';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    console.log(player.lastName);
    console.log(player.team);
    return this.http.put<Team>(url, teamid,{headers});
  }

  createPlayer(player:Player):Observable<Player>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
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

}
