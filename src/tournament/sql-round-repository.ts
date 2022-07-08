import { handleError } from "express-ext";
import { matchModel } from "match";
import { param } from "pg-extension";
import { buildToInsertBatch, DB, Repository } from "query-core";
import { roundModel } from "../round/round";
import { RoundRepository } from "./tournament";
import {
  Match,
  Round,
  Team,
  Tournament,
  tournamentModel,
  TournamentRepository,
} from "./tournament";

export class SqlRoundRepository
  extends Repository<Match, string>
  implements RoundRepository
{
  constructor(db: DB) {
    super(db, "rounds", roundModel);
  }

  getRoundByTournament(tournament: string): Promise<Round[]> {
    return this.query<Round>(
      `select * from rounds where tournamentId = ${this.param(1)}`,
      [tournament]
    );
  }
}
