import { DB, Repository } from "query-core";
import {
  Match,
  matchModel,
  MatchRepository,
} from "./match";

export class SqlMatchRepository
  extends Repository<Match, string>
  implements MatchRepository
{
  constructor(db: DB) {
    super(db, "match", matchModel);
  }
}
