import { handleError } from "express-ext";
import { DB, Repository, select } from "query-core";
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
  getTournamentById(id: string): Promise<Tournament[]> {
    return this.query<Tournament>(
      `select * from tournaments where id = ${this.param(1)}`,
      [id]
    );
  }
}
