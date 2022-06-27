import { Log, Manager, Search } from 'onecore';
import { DB, postgres, SearchBuilder } from 'query-core';
import { buildQuery } from './query';
import { Teams, TeamFilter, TeamModel, TeamRepository, TeamService } from './team';
import { TeamController } from './team-controller';
export * from './team';
export { TeamController };
import { SqlTeamRepository } from './sql-team-repository';

export class TeamManager extends Manager<Teams, string, TeamFilter> implements TeamService {
  constructor(search: Search<Teams, TeamFilter>, repository: TeamRepository) {
    super(search, repository);
  }
}
export function useTeamService(db: DB): TeamService {
  const builder = new SearchBuilder<Teams, TeamFilter>(db.query, 'teams', TeamModel, postgres, buildQuery);
  const repository = new SqlTeamRepository(db);
  return new TeamManager(builder.search, repository);
}
export function useTeamController(log: Log, db: DB): TeamController {
  return new TeamController(log, useTeamService(db));
}
