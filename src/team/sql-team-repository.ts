import { DB, Repository } from 'query-core';
import { Teams, TeamModel, TeamRepository } from './team';

export class SqlTeamRepository extends Repository<Teams, string> implements TeamRepository {
  constructor(db: DB) {
    super(db, 'teams', TeamModel);
  }
}
