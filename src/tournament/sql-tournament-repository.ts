import { handleError } from "express-ext";
import { DB, Repository } from "query-core";
import {
  Match,
  Round,
  Team,
  Tournament,
  tournamentModel,
  TournamentRepository,
} from "./tournament";

export class SqlTournamentRepository
  extends Repository<Tournament, string>
  implements TournamentRepository
{
  constructor(db: DB) {
    super(db, "tournaments", tournamentModel);
  }
  // generateMatches(tournamentId: string): Promise<Match[]>{
  //   return this.query<Match>
  // }
  // saveMatches(
  //   tournamentId: string,
  //   round: string,
  //   team1: string,
  //   team2: string
  // ): Promise<Match[]> | string {
  //   try {
  //     this.query<Match>(
  //       `insert into matches (id, tournamentId, round, team1, team2, score1, score2, dateCreated) values (DEFAULT,${this.param(
  //         1
  //       )},${this.param(2)},${this.param(3)},${this.param(4)},0,0,'2022-06-22');
  //   `,
  //       [tournamentId, round, team1, team2]
  //     );
  //     return "success";
  //   } catch (error) {
  //     return "error";
  //   }
  // }

  // getTeamByTournament(tournament: string): Promise<Team[]> {
  //   return this.query<Team>(
  //     `select * from teams where tournamentId = ${this.param(1)}`,
  //     [tournament]
  //   );
  // }
  // getRoundByTournament(tournament: string): Promise<Round[]> {
  //   return this.query<Round>(
  //     `select * from rounds where tournamentId = ${this.param(1)}`,
  //     [tournament]
  //   );
  // }
}
