import { DB, Repository } from 'query-core';
import { Players, PlayerModel, PlayerRepository } from './player';

export class SqlPlayerRepository extends Repository<Players, string> implements PlayerRepository {
  constructor(db: DB) {
    super(db, 'players', PlayerModel);
  }
}
