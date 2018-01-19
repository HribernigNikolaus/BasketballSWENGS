import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Stadium} from "../../entities/stadium";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";

@Injectable()
export class StadiumService{

  constructor(private http: HttpClient){

  }

  findAll(): Promise<Array<Stadium>>{
    let url= 'http://localhost:8080/stadiums'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Stadium>>(url,{headers}).
    toPromise().
    then(stadiums => stadiums['_embedded']['stadiums']);
  }



  save(stadium:Stadium): Observable<Stadium>{
    let url= 'http://localhost:8080/stadiums/'+stadium.id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json').set('Content-Type', 'application/json');
    return this.http.put<Stadium>(url,stadium,{headers});
  }

  findById(id: string): Observable<Stadium>{

    const url = 'http://localhost:8080/stadiums/'+id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Stadium>(url, {headers});
  }

  create(id: string): Observable<Stadium>{

    const url = 'http://localhost:8080/stadiums/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Stadium>(url, {params,headers});
  }

  createNew(stadium:Stadium): Observable<Stadium>{

    const url = 'http://localhost:8080/stadiums/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Stadium>(url, stadium, {headers});
  }

  findAllTeams(): Promise<Array<Team>>{
  let url= 'http://localhost:8080/teams'
  let headers = new HttpHeaders()
    .set('Accept', 'application/json');
  return this.http.get<Array<Team>>(url,{headers}).toPromise().then(teams => teams['_embedded']['teams']);
}
}
