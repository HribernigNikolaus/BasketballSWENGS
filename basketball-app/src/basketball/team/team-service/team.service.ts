import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";
import {League} from "../../entities/league";

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
  save(team:Team): Observable<Team>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Team>(url, team,{headers});
  }

  findById(id: string): Observable<Team>{

    const url = 'http://localhost:8080/teams';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {params,headers});
  }

}
