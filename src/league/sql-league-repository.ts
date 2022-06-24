import { DB, Repository } from "query-core";
import { League, leagueModel, LeagueRepository } from "./league";

export class SqlLeagueRepository
  extends Repository<League, string>
  implements LeagueRepository
{
  constructor(db: DB) {
    super(db, "leagues", leagueModel);
  }
}
