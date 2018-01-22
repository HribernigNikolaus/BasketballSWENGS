  import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Team} from "../../entities/team";
import {League} from "../../entities/league";
  import {StadiumService} from "../../stadium/stadium-service/stadium.service";
  import {Stadium} from "../../entities/stadium";
  import {toPromise} from "rxjs/operator/toPromise";
  import {Player} from "../../entities/player";
  import {Router} from "@angular/router";

@Injectable()
export class TeamService{
  team:Team;
  teamWithoutPlayer:Team;
  constructor(private http: HttpClient, private router:Router){

  }
  findAll(): Promise<Array<Team>>{
    let url= 'http://localhost:8080/teams'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Team>>(url,{headers}).toPromise().then(teams => teams['_embedded']['teams']);
  }
  findAllPlayers(): Promise<Array<Player>>{
    let url= 'http://localhost:8080/players'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Player>>(url,{headers}).
    toPromise().
    then(players => players['_embedded']['players']);
  }

  findAllStadiums(): Promise<Array<Stadium>>{
    let url= 'http://localhost:8080/stadiums'
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Stadium>>(url,{headers}).
    toPromise().
    then(stadiums => stadiums['_embedded']['stadiums']);
  }

  findAllLeagues(): Promise<Array<League>>{
  let url= 'http://localhost:8080/leagues'
  let headers = new HttpHeaders()
    .set('Accept', 'application/json');
  return this.http.get<Array<League>>(url,{headers}).
  toPromise().
  then(leagues => leagues['_embedded']['leagues']);}

  findPlayersOfTeam(team:Team): Promise<Array<Player>> {
    const url = 'http://localhost:8080/teams/' + team.id + '/players';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Array<Player>>(url, {headers}).toPromise().then(teams => teams['_embedded']['players']);
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
  findLeague(id: string): Observable<League>{

    const url = 'http://localhost:8080/teams/' + id + '/league/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<League>(url, {headers});
  }

  create(id: string): Observable<Team>{

    const url = 'http://localhost:8080/teams/';
    const params = new HttpParams()
      .set('id', id);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Team>(url, {params,headers});
  }

  deletePlayerOfTeam(team:Team, player:Player){

    let url = 'http://localhost:8080/players/'+player.id +'/team';
    let headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<Team>(url, { headers });
  }
  saveAllUpdate(team:Team, players:Array<Player>, stadium:Stadium, league:League):void{
    this.team  = team;
    this.teamWithoutPlayer= team;
    this.teamWithoutPlayer.players=null;
    this.saveStadiumOfTeam(team, stadium).subscribe(
      stadium=>{this.team.stadium=stadium;
        this.saveLeagueOfTeam(team, league).subscribe(
          league=>{this.team.league=league;
            this.saveTeam(this.teamWithoutPlayer).subscribe(
              team=>{console.log("Team edit");
                for(let player of players)
                {
                  this.savePlayerOfTeam(team, player.id).subscribe(
                    player=>      {//this.team.players.push(player)// ;

                      console.log("Player eddided");
                      this.router.navigate(['/team'])
                    },
                    err=>{console.error('Fehler beim Speichern')}
                  );

                }
                }, err=>console.error('Fehler beim speichern')
            );

            console.log("League eddided")},
          err=>{console.error('Fehler beim Speichern')}
        )
        console.log("Stadium eddided")},
      err=>{console.error('Fehler beim Speichern')}
    )


  }
  saveTeam(team:Team):Observable<Team>{
    let url= 'http://localhost:8080/teams/' + team.id
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<Team>(url, team,{headers});
  }

  saveLeagueOfTeam(team:Team, league:League):Observable<League>{
    let url= 'http://localhost:8080/teams/' + team.id + '/league';
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    let changeUrl = 'http://localhost:8080/leagues/'+ league.id
    return this.http.put<League>(url, changeUrl,{headers});

  }
  saveStadiumOfTeam(team:Team, stadium:Stadium):Observable<Stadium>{
    let url= 'http://localhost:8080/teams/' + team.id + '/stadium';
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    let changeUrl = 'http://localhost:8080/stadiums/'+ stadium.id
    return this.http.put<Stadium>(url, changeUrl,{headers});

  }
  savePlayerOfTeam(team:Team ,playerId:number):Observable<Player> {
    //console.log(teamId);
    let url = 'http://localhost:8080/players/' +playerId + '/team'
    let headers = new HttpHeaders()
      .set('Content-Type', 'text/uri-list');
    let changeUrl = 'http://localhost:8080/teams/' + team.id
    return this.http.put<Player>(url, changeUrl, {headers});
  }


  findStadiumByID(id:String):Observable<Stadium> {
    const url = 'http://localhost:8080/stadiums/'+id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<Stadium>(url, {headers});

  }

  findLeagueByID(id:String):Observable<League>{
    const url = 'http://localhost:8080/leagues/'+id;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<League>(url, {headers});

  }
  createNew(team:Team): Observable<Team>{
  this.teamWithoutPlayer = team;
  this.teamWithoutPlayer.players = null;
  this.teamWithoutPlayer.stadium = null;
  this.teamWithoutPlayer.league = null;
    const url = 'http://localhost:8080/teams/';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<Team>(url, this.teamWithoutPlayer, {headers});
  }
}
