import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Stadium} from "../../entities/stadium";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";
import {forEach} from "@angular/router/src/utils/collection";
import {isUndefined} from "util";

@Injectable()
export class StadiumService{
stadium:Stadium;
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

  findTeamsOfStadium(stadium:Stadium): Promise<Array<Team>>{
    const url = 'http://localhost:8080/stadiums/'+stadium.id+'/teams';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url, {headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }
  saveTeamAndStadium(stadium:Stadium, teams:Array<Team>): Observable<Stadium>{
    //console.log(teams);
    //console.log(stadium);
    this.stadium = stadium;
    for(let team of teams)
    {
     //console.log(team);
      this.saveTeamOfStadium(stadium, team.id).subscribe(
      team=>      {this.stadium.teams.push(team);
        //console.log("Team eddided")
        },
      err=>{console.error('Fehler beim Speichern')}
    )}
    //}
    let url= 'http://localhost:8080/stadiums/' + stadium.id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<Stadium>(url, stadium,{headers});
  }

  deleteTeamsOfStadium(stadium:Stadium, team:Team){

      let url = 'http://localhost:8080/teams/'+team.id +'/stadium';
      let headers = new HttpHeaders().set('Accept', 'application/json');
      return this.http.delete<Stadium>(url, { headers });
  }

  saveTeamOfStadium(stadium:Stadium ,teamId:number):Observable<Team> {
   console.log(teamId);
    let url = 'http://localhost:8080/teams/' + teamId + '/stadium'
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    let changeUrl = 'http://localhost:8080/stadiums/' + stadium.id
    return this.http.put<Team>(url, changeUrl, {headers});
  }

  deleteStadium(stadium:Stadium):Observable<Stadium> {

    let url = 'http://localhost:8080/stadiums/'+stadium.id;
  let headers = new HttpHeaders().set('Accept', 'application/json');
  return this.http.delete<Stadium>(url, { headers });
}
}
