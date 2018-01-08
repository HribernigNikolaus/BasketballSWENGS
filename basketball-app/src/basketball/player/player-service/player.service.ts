import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Player} from "../../entities/player";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlayerService{

  constructor(private http: HttpClient){

  }

  findAll(): Observable<Player[]>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Player[]>(url,{headers});
  }
  save(stadium:Player): Observable<Player>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Player>(url, stadium,{headers});
  }

}
