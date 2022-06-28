import { Log, Manager, Search } from 'onecore';
import { DB, postgres, SearchBuilder } from 'query-core';
import { buildQuery } from './query';
import { Match, MatchFilter, matchModel, MatchRepository, MatchService } from './match';
import { MatchController } from './match-controller';
export * from './match';
export { MatchController };
import { SqlMatchRepository } from './sql-match-repository';

export class MatchManager extends Manager<Match, string, MatchFilter> implements MatchService {
  constructor(search: Search<Match, MatchFilter>, repository: MatchRepository) {
    super(search, repository);
  }
  getMatches(tournamentId: string, round: string): Promise<Match> {
    return null;
  }
}
export function useMatchService(db: DB): MatchService {
  const builder = new SearchBuilder<Match, MatchFilter>(db.query, 'match', matchModel, postgres, buildQuery);
  const repository = new SqlMatchRepository(db);
  return new MatchManager(builder.search, repository);
}
export function useMatchController(log: Log, db: DB): MatchController {
  return new MatchController(log, useMatchService(db));
}
