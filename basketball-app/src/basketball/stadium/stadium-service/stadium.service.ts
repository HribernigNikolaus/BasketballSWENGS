import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Stadium} from "../../entities/stadium";
import {Observable} from "rxjs/Observable";

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
    let url= 'http://localhost:8080/stadiums'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Stadium>(url,stadium,{headers});
  }

}
