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

}
