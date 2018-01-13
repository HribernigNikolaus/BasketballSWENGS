import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {League} from "../../entities/league";
import {Observable} from "rxjs/Observable";
import {Stadium} from "../../entities/stadium";

@Injectable()
export class LeagueService{

  constructor(private http: HttpClient){

  }

  findAll(): Promise<Array<League>>{
    let url= 'http://localhost:8080/leagues'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<League>>(url,{headers}).
    toPromise().
    then(leagues => leagues['_embedded']['leagues']);
  }

  save(league:League): Observable<League>{
    let url= 'http://localhost:8080/leagues'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<League>(url,league, {headers});
  }

  findById(id: string): Observable<League>{

    const url = 'http://localhost:8080/leagues';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<League>(url, {params,headers});
  }

}
