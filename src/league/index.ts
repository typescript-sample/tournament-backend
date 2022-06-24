import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import {
  League,
  LeagueFilter,
  leagueModel,
  LeagueRepository,
  LeagueService,
} from "./league";
import { LeagueController } from "./league-controller";
import { SqlLeagueRepository } from "./sql-league-repository";

export class LeagueManager
  extends Manager<League, string, LeagueFilter>
  implements LeagueService
{
  constructor(
    search: Search<League, LeagueFilter>,
    repository: LeagueRepository
  ) {
    super(search, repository);
  }
}
export function useLeagueService(db: DB, mapper?: TemplateMap): LeagueService {
  const query = useQuery("leagues", mapper, leagueModel, true);
  const builder = new SearchBuilder<League, LeagueFilter>(
    db.query,
    "leagues",
    leagueModel,
    postgres,
    query
  );
  const repository = new SqlLeagueRepository(db);
  return new LeagueManager(builder.search, repository);
}
export function useLeagueController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): LeagueController {
  return new LeagueController(log, useLeagueService(db, mapper));
}
