import { DB, Repository } from "query-core";
import {
  Tournament,
  tournamentModel,
  TournamentRepository,
} from "./tournament";

export class SqlTournamentRepository
  extends Repository<Tournament, string>
  implements TournamentRepository
{
  constructor(db: DB) {
    super(db, "touraments", tournamentModel);
  }
}
