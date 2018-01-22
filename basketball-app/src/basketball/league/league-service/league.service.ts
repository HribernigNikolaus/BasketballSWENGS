import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {League} from "../../entities/league";
import {toPromise} from "rxjs/operator/toPromise";
import {Team} from "../../entities/team";

@Injectable()
export class LeagueService {
  league:League;

  constructor(private http: HttpClient) {

  }

  findAll(): Promise<Array<League>> {
    let url = 'http://localhost:8080/leagues'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<League>>(url, {headers}).toPromise().then(leagues => leagues['_embedded']['leagues']);
  }

  save(league: League): Observable<League> {
    let url = 'http://localhost:8080/leagues' + league.id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<League>(url, league, {headers});
  }

  findById(id: string): Observable<League> {

    const url = 'http://localhost:8080/leagues/' + id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<League>(url, {headers});
  }

  create(id: string): Observable<League> {

    const url = 'http://localhost:8080/leagues/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<League>(url, {params, headers});
  }

  findTeamsOfLeague(league: League): Promise<Array<Team>> {
    const url = 'http://localhost:8080/leagues/' + league.id + '/teams';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url, {headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }

  findAllTeams(): Promise<Array<Team>> {
    let url = 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url, {headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }


  saveTeamAndLeague(league: League, teamsOfLeague: Array<Team>):Observable<League> {
  this.league = league;
  for(let team of teamsOfLeague)
  {
    //console.log(team);
    this.saveTeamOfLeague(league, team.id).subscribe(
      team=>      {this.league.teams.push(team);
        //console.log("Team eddided")
      },
      err=>{console.error('Fehler beim Speichern')}
    )}
  //}
  let url= 'http://localhost:8080/leagues/' + league.id;
  let headers = new HttpHeaders()
    .set('Accept', 'application/json');
  return this.http.put<League>(url, league,{headers});

  }

  saveTeamOfLeague(league: League, id: number) :Observable<Team> {
    //console.log(teamId);
    let url = 'http://localhost:8080/teams/' + id + '/league'
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    let changeUrl = 'http://localhost:8080/leagues/' + league.id
    return this.http.put<Team>(url, changeUrl, {headers});

  }

  createNew(league: League):Observable<League>{
    const url = 'http://localhost:8080/leagues/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<League>(url, league, {headers});

  }

  deleteTeamsOfLeague(league: League, team: Team):Observable<League> {
    let url = 'http://localhost:8080/teams/'+team.id +'/league';
    let headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<League>(url, { headers });

  }

  deleteLeague(league: League):Observable<League> {
    let url = 'http://localhost:8080/leagues/'+league.id;
    let headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<League>(url, { headers });

  }
}
