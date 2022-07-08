import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder, buildToInsertBatch } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import { SqlMatchRepository } from "./sql-match-repository";
import { SqlRoundRepository } from "./sql-round-repository";
import { SqlTeamRepository } from "./sql-team-repository";

export { TournamentController };
import { SqlTournamentRepository } from "./sql-tournament-repository";
import {
  Match,
  MatchRepository,
  Round,
  RoundRepository,
  Team,
  TeamRepository,
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
    protected tournamentRepository: TournamentRepository,
    protected roundRepository: RoundRepository,
    protected matchRepository: MatchRepository,
    protected teamRepository: TeamRepository
  ) {
    super(search, tournamentRepository);
  }

  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number> {
    return this.matchRepository.buildToInsertMatches(matches, ctx);
  }
  getTeamByTournament(tournament: string): Promise<Team[]> {
    return this.teamRepository.getTeamByTournament(tournament);
  }
  getRoundByTournament(tournament: string): Promise<Round[]> {
    return this.roundRepository.getRoundByTournament(tournament);
  }
}
export function useTournamentService(
  db: DB,
  mapper?: TemplateMap
): TournamentService {
  const query = useQuery("tournaments", mapper, tournamentModel, true);
  const builder = new SearchBuilder<Tournament, TournamentFilter>(
    db.query,
    "tournaments",
    tournamentModel,
    postgres,
    query
  );

  const tournamentRepository = new SqlTournamentRepository(db);
  const roundRepository = new SqlRoundRepository(db);
  const matchRepository = new SqlMatchRepository(db);
  const teamRepository = new SqlTeamRepository(db);

  return new TournamentManager(
    builder.search,
    tournamentRepository,
    roundRepository,
    matchRepository,
    teamRepository
  );
}
export function useTournamentController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): TournamentController {
  return new TournamentController(log, useTournamentService(db, mapper));
}
