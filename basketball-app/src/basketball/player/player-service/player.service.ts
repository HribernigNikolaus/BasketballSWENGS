import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Player} from "../../entities/player";
import {Observable} from "rxjs/Observable";
import {Stadium} from "../../entities/stadium";

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

  save(stadium:Player): Observable<Player>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Player>(url, stadium,{headers});
  }

}
