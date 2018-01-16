import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Player} from "../../entities/player";
import {Observable} from "rxjs/Observable";


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
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Player>(url, player,{headers});
  }

  createPlayer(player:Player):Observable<Player>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Player>(url, player, {headers});
  }
  create(id: string): Observable<Player>{

    const url = 'http://localhost:8080/players/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Player>(url, {params,headers});
  }

}
