import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";

@Injectable()
export class TeamService{

  constructor(private http: HttpClient){

  }
  findAll(): Observable<Team[]>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team[]>(url,{headers});
  }
  save(team:Team): Observable<Team>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Team>(url, team,{headers});
  }
}
