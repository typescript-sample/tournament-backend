import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";

export { TournamentController };
import { SqlTournamentRepository } from "./sql-tournament-repository";
import {
  Tournament,
  TournamentFilter,
  tournamentModel,
  TournamentRepository,
  TournamentService,
} from "./tournament";
import { TournamentController } from "./tournament-controller";

export class TournamentManager
  extends Manager<Tournament, string, TournamentFilter>
  implements TournamentService
{
  constructor(
    search: Search<Tournament, TournamentFilter>,
    repository: TournamentRepository
  ) {
    super(search, repository);
  }
}
export function useTournamentService(
  db: DB,
  mapper?: TemplateMap
): TournamentService {
  const query = useQuery("tournament", mapper, tournamentModel, true);
  const builder = new SearchBuilder<Tournament, TournamentFilter>(
    db.query,
    "tournaments",
    tournamentModel,
    postgres,
    query
  );
  const repository = new SqlTournamentRepository(db);
  return new TournamentManager(builder.search, repository);
}
export function useTournamentController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): TournamentController {
  return new TournamentController(log, useTournamentService(db, mapper));
}
