  import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";
import {League} from "../../entities/league";
  import {StadiumService} from "../../stadium/stadium-service/stadium.service";
  import {Stadium} from "../../entities/stadium";
  import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class TeamService{

  constructor(private http: HttpClient){

  }
  findAll(): Promise<Array<Team>>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url,{headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }

  findStadiums(): Promise<Array<Stadium>>{
    let url = 'http://localhost:8080/stadiums'
    let headers = new HttpHeaders().set('Accepct', 'application/json');
    return this.http.get<Array<Stadium>>(url, {headers}).toPromise().then(stadiums => stadiums['_embedded']['stadiums']);
}
  save(team:Team): Observable<Team>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Team>(url, team,{headers});
  }

  findById(id: string): Observable<Team>{

    const url = 'http://localhost:8080/teams/' + id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {headers});
  }

  findStadium(id: string): Observable<Stadium>{

    const url = 'http://localhost:8080/teams/' + id + '/stadium/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Stadium>(url, {headers});
  }

  create(id: string): Observable<Team>{

    const url = 'http://localhost:8080/teams/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {params,headers});
  }


}
